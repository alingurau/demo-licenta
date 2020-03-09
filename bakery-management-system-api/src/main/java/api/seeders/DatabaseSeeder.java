package api.seeders;

import api.entity.Role;
import api.entity.User;
import api.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.context.event.EventListener;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class DatabaseSeeder {
    @Autowired
    private JdbcTemplate jdbcTemplate;
    @Autowired
    private UserRepository userRepository;

    @EventListener
    public void seed(ContextRefreshedEvent event) {
        seedUsersTable();
    }

    private void seedUsersTable() {
        adminSeedUser();
    }

    private void adminSeedUser() {
        String sql = "SELECT username FROM user u WHERE u.username = \"admin@bms.com\" LIMIT 1";
        List<User> u = jdbcTemplate.query(sql, (resultSet, rowNum) -> null);

        if (u == null || u.size() <= 0) {
            User user = new User();
            user.setFirstName("Admin");
            user.setLastName("BMS");
            user.setUsername("admin@bms.com");
            user.setPassword(new BCryptPasswordEncoder().encode("admin1234"));
            user.setRole(Role.ADMIN);

            userRepository.save(user);
        }
    }
}
