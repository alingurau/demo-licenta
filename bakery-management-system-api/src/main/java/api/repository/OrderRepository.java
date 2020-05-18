package api.repository;

import api.entity.Client;
import api.entity.Order;
import api.entity.User;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Collection;

@Repository
public interface OrderRepository extends CrudRepository<Order, Long> {

    Collection<Order> findAllByClientId(Client id);

    @Query(value = "SELECT o FROM Order o left join o.clientId c WHERE c.userId = :user ORDER BY o.end desc")
    Collection<Order> findAllOrdersByUserId(@Param("user") User user);
}
