package api.service;

import api.entity.BaseEntity;
import api.exceptions.RestExceptions;
import api.rest.BaseLogger;
import org.springframework.data.repository.CrudRepository;

import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.util.Date;
import java.util.Optional;

public class EntityUpdateService<T extends BaseEntity, R extends CrudRepository<T, Long>> {

    private R repository;

    public EntityUpdateService(R repository){
        this.repository = repository;
    }

    public T updateAndIgnoreNulls(T entity, long id) {

        try {

            Optional<T> savedEntity = this.repository.findById(id);

            if(savedEntity.isPresent()){

                update(entity, savedEntity.get());
                savedEntity.get().setModified(new Date());
                return this.repository.save(savedEntity.get());

            } else {

                throw new RestExceptions.OperationFailed("Entity not found");

            }

        } catch (Exception e){
            BaseLogger.log(EntityUpdateService.class).error(e.getMessage());
            throw new RestExceptions.OperationFailed(e.getMessage());
        }

    }

    private void update(T entity, T savedEntity) throws NoSuchMethodException, IllegalAccessException, InvocationTargetException {
        for(Method im : entity.getClass().getMethods()){
            if(im.getName().startsWith("get") && !im.isSynthetic() && !im.isBridge() && !im.getName().contains("Class")){
                Method fieldGetter = entity.getClass().getMethod(im.getName());
                if(fieldGetter.invoke(entity) != null){
                    Method fieldSetter = savedEntity.getClass().getMethod("set" + im.getName().substring("set".length()), fieldGetter.getReturnType());
                    fieldSetter.invoke(savedEntity, fieldGetter.invoke(entity));
                }
            }
        }
    }

}
