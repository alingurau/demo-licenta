package api.security;

import api.entity.User;
import api.exceptions.RestExceptions;
import api.models.AuthResponse;
import api.models.AuthenticationResponse;
import api.rest.BaseLogger;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;
import api.repository.UserRepository;
import api.service.UserDetailsServiceImpl;

import javax.servlet.FilterChain;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.Date;

import static api.security.SecurityConstants.EXPIRATION_TIME;
import static api.security.SecurityConstants.SECRET;
import static api.security.SecurityConstants.SIGN_IN_URL;

class JWTAuthenticationFilter extends UsernamePasswordAuthenticationFilter {

    private final AuthenticationManager authenticationManager;
    private final UserRepository userRepository;

    public JWTAuthenticationFilter(AuthenticationManager authenticationManager, UserDetailsServiceImpl userDetailsService) {

        setRequiresAuthenticationRequestMatcher(new AntPathRequestMatcher(SIGN_IN_URL, "POST"));
        this.authenticationManager = authenticationManager;
        this.userRepository = userDetailsService.getUserEntityOnSignIn();

    }

    @Override
    public Authentication attemptAuthentication(HttpServletRequest req, HttpServletResponse res) {

        try {

            User user = new ObjectMapper().readValue(req.getInputStream(), User.class);
            UsernamePasswordAuthenticationToken authRequest = new UsernamePasswordAuthenticationToken(
                    user.getUsername(),
                    user.getPassword(),
                    new ArrayList<>()
            );

            return authenticationManager.authenticate(authRequest);

        } catch (IOException e) {

            BaseLogger.log(JWTAuthenticationFilter.class).error(e.getMessage());
            throw new RestExceptions.Forbidden(e.getMessage());

        }

    }

    @Override
    protected void unsuccessfulAuthentication(HttpServletRequest request, HttpServletResponse response, AuthenticationException failed) {
        try {

            response.setContentType("application/json");
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            PrintWriter out = response.getWriter();

            AuthenticationResponse body = new AuthenticationResponse();
            body.setMessage("Invalid credentials. Please check and try again.");

            ObjectMapper mapper = new ObjectMapper();
            mapper.enable(SerializationFeature.INDENT_OUTPUT);
            mapper.writeValue(out, body);
            out.close();

        } catch (IOException e) {

            BaseLogger.log(JWTAuthenticationFilter.class).error(e.getMessage());
            throw new RestExceptions.OperationFailed(e.getMessage());

        }
    }

    @Override
    protected void successfulAuthentication(HttpServletRequest req, HttpServletResponse res, FilterChain chain, Authentication auth) {

        String token = Jwts.builder()
                .setSubject(((org.springframework.security.core.userdetails.User) auth.getPrincipal())
                .getUsername())
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
                .signWith(SignatureAlgorithm.HS512, SECRET.getBytes())
                .compact();

        String username = ((org.springframework.security.core.userdetails.User) auth.getPrincipal()).getUsername();
        User user = userRepository.findByUsername(username);

        try {

            res.setContentType("application/json");
            PrintWriter out = res.getWriter();

            AuthResponse response = new AuthResponse();
            response.setFirstName(user.getFirstName());
            response.setLastName(user.getLastName());
            response.setRole(user.getRole());
            response.setToken(token);
            response.setUsername(user.getUsername());
            response.setId(user.getId());

            ObjectMapper mapper = new ObjectMapper();
            mapper.enable(SerializationFeature.INDENT_OUTPUT);
            mapper.writeValue(out, response);
            out.close();

        } catch (Exception e) {

            BaseLogger.log(JWTAuthenticationFilter.class).error(e.getMessage());
            throw new RestExceptions.OperationFailed(e.getMessage());

        }

    }
}