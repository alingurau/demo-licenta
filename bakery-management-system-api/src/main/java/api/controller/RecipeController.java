package api.controller;

import api.entity.Recipe;
import api.entity.User;
import api.exceptions.RestExceptions;
import api.repository.RecipeRepository;
import api.repository.UserRepository;
import api.rest.BaseLogger;
import api.rest.RestImplementation;
import api.service.EntityUpdateService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Optional;

import static org.springframework.web.bind.annotation.RequestMethod.*;

@RestController
@RequestMapping("/recipe")
public class RecipeController extends RestImplementation<RecipeRepository, Recipe> {

    private RecipeRepository recipeRepository;

    @Autowired
    private UserRepository userRepository;

    private EntityUpdateService<Recipe, RecipeRepository> reflection;

    protected RecipeController(RecipeRepository recipeRepository) {
        super(recipeRepository);
        this.recipeRepository = recipeRepository;
    }


    @RequestMapping(method=GET, value = "/{id}")
    @Override
    public Optional<Recipe> getOne(@PathVariable(value = "id") long id) {
        try {
            Optional<Recipe> recipe = this.recipeRepository.findById(id);

            if (!(this.hasAccessToEntity(recipe, null))) {
                throw new RestExceptions.BadRequest("Recipe does not exist");
            }

            return recipe;
        } catch (Exception e) {
            BaseLogger.log(ClientController.class).error(e.getMessage());
            throw new RestExceptions.OperationFailed(e.getMessage());
        }

    }

    @RequestMapping(method = POST)
    @Override
    public Recipe create(@RequestBody Recipe data) {
        try {
            Optional<User> user = this.userRepository.findById(data.getUserId().getId());

            if (!user.isPresent()) {
                throw new RestExceptions.BadRequest("User does not exist");
            }

            data.setUserId(user.get());

            return this.recipeRepository.save(data);

        } catch (Exception e) {
            BaseLogger.log(RestImplementation.class).error(e.getMessage());
            throw new RestExceptions.OperationFailed(e.getMessage());
        }
    }

    @RequestMapping(method = PATCH, value = "/{id}")
    @Override
    public Recipe update(@RequestBody Recipe data, @PathVariable(value = "id") long id) {

        Optional<Recipe> entity = this.recipeRepository.findById(id);
        this.reflection = new EntityUpdateService<>(this.recipeRepository);

        if (!entity.isPresent() || data.getId() != entity.get().getId()) {

            String msg = "Entity id does not match PUT parameter";
            BaseLogger.log(RecipeController.class).error(msg);
            throw new RestExceptions.EntityNotFoundException(msg);

        }

        if (!(this.hasAccessToEntity(entity, null))) {
            throw new RestExceptions.BadRequest("Recipe does not exist");
        }
        Optional<User> user = this.userRepository.findById(data.getUserId().getId());

        if (!user.isPresent()) {
            throw new RestExceptions.BadRequest("User does not exist");
        }

        data.setUserId(user.get());

        return this.reflection.updateAndIgnoreNulls(data, id);

    }

    @RequestMapping(method = GET, value = "/listAll")
    public List<Recipe> listAll() throws Exception{

        List<Recipe> recipes = new ArrayList<>();

        recipeRepository.findAll().forEach(recipes::add);
        return recipes;

    }

    @RequestMapping(method = DELETE, value = "/{id}")
    public Recipe delete(@PathVariable(value = "id") long id){

        Optional<Recipe> recipe = this.recipeRepository.findById(id);

        if (!(this.hasAccessToEntity(recipe, null))) {
            throw new RestExceptions.BadRequest("Client does not exist");
        }

        if(recipe.isPresent()){
            try{
                this.recipeRepository.delete(recipe.get());
                return recipe.get();
            } catch (Exception e){
                BaseLogger.log(RestImplementation.class).error(e.getMessage());
                throw new RestExceptions.OperationFailed(e.getMessage());
            }
        } else {
            String msg = "Recipe does not exist";
            BaseLogger.log(RestImplementation.class).error(msg);
            throw new RestExceptions.EntityNotFoundException(msg);
        }

    }

    @RequestMapping(method = GET, value = "/listByUserId/{id}")
    public Collection<Recipe> listByUserId(@PathVariable(value = "id") long id) {

        Optional<User> user = this.userRepository.findById(id);

        if (!user.isPresent()) {
            throw new RestExceptions.BadRequest("User does not exist");
        }

        return this.recipeRepository.findAllByUserId(user.get());

    }

    private boolean hasAccessToEntity(Optional<Recipe> recipe, User user) {
        if (user == null) {
            String username = (String) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
            user = userRepository.findByUsername(username);
        }

        return recipe.isPresent() &&
                (
                        (recipe.get().getUserId().getId() == user.getId() && user.getRole().toString().equals("SUPERUSER")) ||
                                user.getRole().toString().equals("ADMIN")

                );
    }
}
