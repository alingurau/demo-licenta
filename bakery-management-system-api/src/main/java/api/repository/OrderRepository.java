package api.repository;

import api.entity.Client;
import api.entity.Order;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Collection;

@Repository
public interface OrderRepository extends CrudRepository<Order, Long> {

    Collection<Order> findAllByClientId(Client id);

}
