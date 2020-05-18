package api.repository;

import api.entity.Ingredient;
import api.entity.Recipe;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Collection;

@Repository
public interface IngredientRepository extends CrudRepository<Ingredient, Long> {

    Collection<Ingredient> findAllByRecipeId(Recipe id);
}
