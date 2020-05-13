package com.netcracker.service;

import com.netcracker.entity.Contact;
import com.netcracker.entity.Discount;
import com.netcracker.entity.User;
import com.netcracker.payload.request.SignupRequest;
import com.netcracker.payload.response.MessageResponse;
import com.netcracker.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.security.core.userdetails.UserDetails;
//import org.springframework.security.core.userdetails.UserDetailsService;
//import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    PasswordEncoder passwordEncoder;

    public List<User> findAll(){ return userRepository.findAll(); }

    public List<User> scriptFindAll(){ return userRepository.scriptFindAll();}

    public User findById(long id){
        Optional<User> optional = userRepository.findById(id);
        return optional.orElse(new User());
    }

    public User save(User user){
        userRepository.save(user);
        return user;
    }

    public ResponseEntity<String> deleteAll() {
        userRepository.deleteAll();
        return new ResponseEntity<>(HttpStatus.OK);
    }
    public ResponseEntity<String> deleteById(long id){
        userRepository.deleteById(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    private String checkUniqueOfUsername(SignupRequest signupRequest){
        if (userRepository.existsByUsername(signupRequest.getUsername())) {
            return "Error: Username is already taken!";
        }
        return null;
    }

    private String checkUniqueOfUsername(String username){
        if (userRepository.existsByUsername(username)) {
            return "Error: Username is already taken!";
        }
        return null;
    }

    private String checkUniqueOfEmail(SignupRequest signupRequest) {
        if (userRepository.existsByEmail(signupRequest.getEmail())) {
            return "Error: Email is already in use!";
        }
        return null;
    }

    public String[] checkUniqOfUsernameEmail(SignupRequest signupRequest){
        String[] respStr=new String[2];
        respStr[0]=checkUniqueOfUsername(signupRequest);
        respStr[1]=checkUniqueOfEmail(signupRequest);
        return respStr;
    }

    public ResponseEntity<?> sendResponseBadRequest(String message){
        return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse(message));
    }

    public User createUser(SignupRequest signupRequest){
        return new User(
                signupRequest.getUsername(),
                signupRequest.getEmail(),
                passwordEncoder.encode(signupRequest.getPassword()),
                signupRequest.getFirstName(),
                signupRequest.getLastName(),
                signupRequest.getBirthDate(),
                signupRequest.getCategoryName(),
                null
        );
    }

    public ResponseEntity<User> updateUser(Long id, User user) {
        Optional<User> userData = Optional.ofNullable(findById(id));
        String str;
        if (userData.isPresent()){
            User newCustomer=userData.get();
            if (user.getUsername()!=null) {
                newCustomer.setUsername(user.getUsername());
            }
            newCustomer.setEmail(user.getEmail());
            if (user.getPassword()!=null) {
                newCustomer.setPassword(passwordEncoder.encode(user.getPassword()));
            }
            newCustomer.setFirstName(user.getFirstName());
            newCustomer.setLastName(user.getLastName());
            newCustomer.setCategoryName(user.getCategoryName());
            newCustomer.setBirthDate(user.getBirthDate());
            newCustomer.setDiscount((user.getDiscount()));
            return new ResponseEntity<User>(save(newCustomer), HttpStatus.OK);
        } else return  new ResponseEntity<User>(HttpStatus.NOT_FOUND);
    }

    public void updateDiscount(Long id, Discount discount) {
        Optional<User> userData = Optional.ofNullable(findById(id));
        if (userData.isPresent()){
            User newCustomer=userData.get();
            newCustomer.setDiscount(discount);
            save(newCustomer);
        }
    }
}
