package api.repository;

import api.entity.Client;
import api.entity.User;
import org.springframework.data.repository.CrudRepository;

import org.springframework.stereotype.Repository;

import java.util.Collection;

@Repository
public interface ClientRepository extends CrudRepository<Client, Long> {
    Collection<Client> findAllByUserId(User id);
}