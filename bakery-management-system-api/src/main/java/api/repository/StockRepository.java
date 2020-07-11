package api.repository;

import api.entity.Stock;
import api.entity.User;
import org.springframework.data.repository.CrudRepository;

import java.util.Collection;

public interface StockRepository extends CrudRepository<Stock, Long> {
    Collection<Stock> findAllByUserId(User id);
}
