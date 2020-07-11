package api.repository;

import api.entity.Recipe;
import api.entity.User;
import org.springframework.data.repository.CrudRepository;

import java.util.Collection;


public interface RecipeRepository extends CrudRepository<Recipe, Long> {
    Collection<Recipe> findAllByUserId(User id);

}
