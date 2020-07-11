package api.controller;

import api.entity.Client;
import api.entity.Stock;
import api.entity.User;
import api.exceptions.RestExceptions;
import api.repository.ClientRepository;
import api.repository.StockRepository;
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

import java.util.Collection;
import java.util.Optional;

import static org.springframework.web.bind.annotation.RequestMethod.*;

@RestController
@RequestMapping("/stock")
public class StockController extends RestImplementation<StockRepository, Stock> {

    private StockRepository stockRepository;

    @Autowired
    private UserRepository userRepository;

    private EntityUpdateService<Stock, StockRepository> reflection;


    public StockController(StockRepository repository) {
        super(repository);
        this.stockRepository = repository;
    }

    @RequestMapping(method = POST)
    @Override
    public Stock create(@RequestBody Stock data) {
        try {

            Optional<User> user = this.userRepository.findById(data.getUserId().getId());

            if (!user.isPresent()) {
                throw new RestExceptions.BadRequest("User does not exist");
            }

            data.setUserId(user.get());

            return this.stockRepository.save(data);

        } catch (Exception e) {
            BaseLogger.log(StockController.class).error(e.getMessage());
            throw new RestExceptions.OperationFailed(e.getMessage());
        }
    }

    @RequestMapping(method = PATCH, value = "/{id}")
    @Override
    public Stock update(@RequestBody Stock data, @PathVariable(value = "id") long id) {

        Optional<Stock> entity = this.stockRepository.findById(id);
        this.reflection = new EntityUpdateService<>(this.stockRepository);

        if (!entity.isPresent() || data.getId() != entity.get().getId()) {
            String msg = "Entity id does not match PUT parameter";
            BaseLogger.log(StockController.class).error(msg);
            throw new RestExceptions.EntityNotFoundException(msg);
        }

        if (!(this.hasAccessToEntity(entity, null))) {
            throw new RestExceptions.BadRequest("Stock does not exist");
        }

        Optional<User> user = this.userRepository.findById(data.getUserId().getId());

        if (!user.isPresent()) {
            throw new RestExceptions.BadRequest("User does not exist");
        }
        data.setUserId(user.get());
        return this.reflection.updateAndIgnoreNulls(data, id);
    }

    @RequestMapping(method = GET, value = "/listByUserId/{id}")
    public Collection<Stock> listByUserId(@PathVariable(value = "id") long id) {

        Optional<User> user = this.userRepository.findById(id);

        if (!user.isPresent()) {
            throw new RestExceptions.BadRequest("User does not exist");
        }
        return this.stockRepository.findAllByUserId(user.get());
    }

    @RequestMapping(method = GET, value = "/{id}")
    @Override
    public Optional<Stock> getOne(@PathVariable(value = "id") long id) {
        try {
            Optional<Stock> stock = stockRepository.findById(id);

            if (!(this.hasAccessToEntity(stock, null))) {
                throw new RestExceptions.BadRequest("Stock does not exist");
            }
            return stock;
        } catch (Exception e) {
            BaseLogger.log(StockController.class).error(e.getMessage());
            throw new RestExceptions.OperationFailed(e.getMessage());
        }
    }

    @RequestMapping(method = DELETE, value = "/{id}")
    public Stock delete(@PathVariable(value = "id") long id){

        Optional<Stock> stock = this.stockRepository.findById(id);

        if (!(this.hasAccessToEntity(stock, null))) {
            throw new RestExceptions.BadRequest("Stock does not exist");
        }

        if(stock.isPresent()){
            try{
                this.stockRepository.delete(stock.get());
                return stock.get();
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

    private boolean hasAccessToEntity(Optional<Stock> stock, User user) {
        if (user == null) {
            String username = (String) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
            user = userRepository.findByUsername(username);
        }

        return stock.isPresent() &&
                (
                        (stock.get().getUserId().getId() == user.getId() && user.getRole().toString().equals("SUPERUSER")) ||
                                user.getRole().toString().equals("ADMIN")

                );
    }
}
