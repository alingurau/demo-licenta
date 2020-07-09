package api.entity;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Entity
public class Ingredient extends BaseEntity {

    @NotBlank
    private String name;
    @NotNull
    private int amount;
    @NotBlank
    private String unitMeasure;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "recipe_id")
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    private Recipe recipeId;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getAmount() {
        return amount;
    }

    public void setAmount(int amount) {
        this.amount = amount;
    }

    public String getUnitMeasure() {
        return unitMeasure;
    }

    public void setUnitMeasure(String unitMeasure) {
        this.unitMeasure = unitMeasure;
    }

    public Recipe getRecipe() {
        return recipeId;
    }

    public void setRecipe(Recipe recipe) {
        this.recipeId = recipe;
    }
}
