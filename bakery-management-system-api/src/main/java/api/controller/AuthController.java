package api.controller;

import api.entity.Role;
import api.entity.User;
import api.exceptions.RestExceptions;
import api.models.AuthResponse;
import api.repository.UserRepository;
import api.rest.BaseLogger;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.core.annotation.Order;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.Date;

import static api.security.SecurityConstants.EXPIRATION_TIME;
import static api.security.SecurityConstants.SECRET;
import static org.springframework.web.bind.annotation.RequestMethod.POST;

@RestController
@Order(1000)
public class AuthController extends WebSecurityConfigurerAdapter {

    private UserRepository userRepository;
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    public AuthController(UserRepository userRepository, BCryptPasswordEncoder bCryptPasswordEncoder){
        this.userRepository = userRepository;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
    }

    @RequestMapping(method = POST, value = "/sign-up")
    public AuthResponse signUp(@RequestBody User data){

        User entity = userRepository.findByUsername(data.getUsername());

        if(entity != null){

            throw new RestExceptions.EntityExistsException();

        } else {

            try{

                User rawData = new User();
                rawData.setPassword(data.getPassword());
                rawData.setUsername(data.getUsername());

                data.setPassword(bCryptPasswordEncoder.encode(data.getPassword()));
                data.setRole(Role.ADMIN);
                userRepository.save(data);

                UsernamePasswordAuthenticationToken authRequest = new UsernamePasswordAuthenticationToken(
                        rawData.getUsername(),
                        rawData.getPassword(),
                        new ArrayList<>()
                );

                Authentication auth = authenticationManager().authenticate(authRequest);

                String token = Jwts.builder()
                        .setSubject(((org.springframework.security.core.userdetails.User) auth.getPrincipal()).getUsername())
                        .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
                        .signWith(SignatureAlgorithm.HS512, SECRET.getBytes())
                        .compact();

                AuthResponse response = new AuthResponse();
                response.setFirstName(data.getFirstName());
                response.setLastName(data.getLastName());
                response.setRole(data.getRole());
                response.setToken(token);
                response.setUsername(data.getUsername());
                response.setId(data.getId());

                return response;

            } catch (Exception e){
                BaseLogger.log(AuthController.class).error(e.getMessage());
                throw new RestExceptions.OperationFailed();
            }

        }
    }

}
