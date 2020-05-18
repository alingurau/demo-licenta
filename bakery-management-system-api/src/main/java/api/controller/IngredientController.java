package api.controller;

import api.entity.Ingredient;
import api.entity.Recipe;
import api.exceptions.RestExceptions;
import api.repository.IngredientRepository;
import api.repository.RecipeRepository;
import api.rest.BaseLogger;
import api.rest.RestImplementation;
import api.service.EntityUpdateService;
import org.springframework.beans.factory.annotation.Autowired;
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
@RequestMapping("/ingredient")
public class IngredientController extends RestImplementation<IngredientRepository, Ingredient> {

    private IngredientRepository ingredientRepository;

    @Autowired
    private RecipeRepository recipeRepository;

    private EntityUpdateService<Ingredient, IngredientRepository> reflection;

    private IngredientController(
            IngredientRepository ingredientRepository
    ) {
        super(ingredientRepository);
        this.ingredientRepository = ingredientRepository;
    }

    @RequestMapping(method=GET, value = "/{id}")
    public Optional<Ingredient> getOne(@PathVariable(value = "id") long id) {
        Optional<Ingredient> ingredient = this.ingredientRepository.findById(id);

        return ingredient;
    }

    @RequestMapping(method = POST)
    @Override
    public Ingredient create(@RequestBody Ingredient data){
        try {

            return this.ingredientRepository.save(data);

        } catch (Exception e) {
            BaseLogger.log(RestImplementation.class).error(e.getMessage());
            throw new RestExceptions.OperationFailed(e.getMessage());
        }
    }

    @RequestMapping(method = PATCH, value = "/{id}")
    @Override
    public Ingredient update(@RequestBody Ingredient data, @PathVariable(value = "id") long id) {

        Optional<Ingredient> entity = this.ingredientRepository.findById(id);
        this.reflection = new EntityUpdateService<>(this.ingredientRepository);

        if (!entity.isPresent() || data.getId() != entity.get().getId()) {

            String msg = "Entity id does not match PUT parameter";
            BaseLogger.log(RecipeController.class).error(msg);
            throw new RestExceptions.EntityNotFoundException(msg);

        }

        return this.reflection.updateAndIgnoreNulls(data, id);
    }

    @RequestMapping(method = GET, value = "/listAll")
    public List<Ingredient> listAll() throws Exception{

        List<Ingredient> ingredients = new ArrayList<>();

        ingredientRepository.findAll().forEach(ingredients::add);
        return ingredients;

    }

    @RequestMapping(method = DELETE, value = "/{id}")
    public Ingredient delete(@PathVariable(value = "id") long id){

        Optional<Ingredient> ingredient = this.ingredientRepository.findById(id);

        if(ingredient.isPresent()){
            try{
                this.ingredientRepository.delete(ingredient.get());
                return ingredient.get();
            } catch (Exception e){
                BaseLogger.log(RestImplementation.class).error(e.getMessage());
                throw new RestExceptions.OperationFailed(e.getMessage());
            }
        } else {
            String msg = "Ingredient does not exist";
            BaseLogger.log(RestImplementation.class).error(msg);
            throw new RestExceptions.EntityNotFoundException(msg);
        }

    }

    @RequestMapping(method = GET, value = "/listByRecipeId/{id}")
    public Collection<Ingredient> listByRecipeId(@PathVariable(value = "id") long id) throws Exception{

        Optional<Recipe> recipe = this.recipeRepository.findById(id);

        if(!recipe.isPresent()){
            throw new RestExceptions.BadRequest("Client does not exist");
        }

        return this.ingredientRepository.findAllByRecipeId(recipe.get());

    }
}
