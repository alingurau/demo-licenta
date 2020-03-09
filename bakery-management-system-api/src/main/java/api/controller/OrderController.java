package api.controller;

import api.entity.*;
import api.exceptions.RestExceptions;
import api.repository.ClientRepository;
import api.repository.OrderRepository;
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
@RequestMapping("/order")
public class OrderController extends RestImplementation<OrderRepository, Order> {

    private OrderRepository orderRepository;
    @Autowired
    private ClientRepository clientRepository;

    private EntityUpdateService<Order, OrderRepository> reflection;

    protected OrderController(OrderRepository orderRepository) {
        super(orderRepository);
        this.orderRepository = orderRepository;
    }

    @RequestMapping(method = GET, value = "/list")
    public List<Order> readAllOrders() {
        List<Order> orders = new ArrayList<>();

        orderRepository.findAll().forEach((order) ->{
            orders.add(order);
        });

        return orders;
    }


    @RequestMapping(method=GET, value = "/{id}")
    public Optional<Order> getOne(@PathVariable(value = "id") long id) {
        Optional<Order> order = this.orderRepository.findById(id);

        return order;
    }

    @RequestMapping(method = POST)
    @Override
    public Order create(@RequestBody Order data){
        try {

            return this.orderRepository.save(data);

        } catch (Exception e) {
            BaseLogger.log(RestImplementation.class).error(e.getMessage());
            throw new RestExceptions.OperationFailed(e.getMessage());
        }
    }

    @RequestMapping(method = PATCH, value = "/{id}")
    @Override
    public Order update(@RequestBody Order data, @PathVariable(value = "id") long id) {

        Optional<Order> entity = this.orderRepository.findById(id);
        this.reflection = new EntityUpdateService<>(this.orderRepository);

        if (!entity.isPresent() || data.getId() != entity.get().getId()) {

            String msg = "Entity id does not match PUT parameter";
            BaseLogger.log(OrderController.class).error(msg);
            throw new RestExceptions.EntityNotFoundException(msg);

        }

        return this.reflection.updateAndIgnoreNulls(data, id);

    }


    @RequestMapping(method = GET, value = "/listByClientId/{id}")
    public Collection<Order> listByClientId(@PathVariable(value = "id") long id) throws Exception{

        Optional<Client> client = this.clientRepository.findById(id);

        if(!client.isPresent()){
            throw new RestExceptions.BadRequest("Client does not exist");
        }

        return this.orderRepository.findAllByClientId(client.get());

    }

    @RequestMapping(method = DELETE, value = "/{id}")
    public Order delete(@PathVariable(value = "id") long id){

        Optional<Order> order = this.orderRepository.findById(id);

        if(order.isPresent()){
            try{
                this.orderRepository.delete(order.get());
                return order.get();
            } catch (Exception e){
                BaseLogger.log(RestImplementation.class).error(e.getMessage());
                throw new RestExceptions.OperationFailed(e.getMessage());
            }
        } else {
            String msg = "Entity does not exist";
            BaseLogger.log(RestImplementation.class).error(msg);
            throw new RestExceptions.EntityNotFoundException(msg);
        }

    }

}
