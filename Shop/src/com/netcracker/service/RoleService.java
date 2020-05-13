package com.netcracker.service;

import com.netcracker.entity.Role;
import com.netcracker.entity.User;
import com.netcracker.models.ERole;
import com.netcracker.repository.RoleRepository;
import com.netcracker.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
public class RoleService {
    @Autowired
    private RoleRepository roleRepository;

    public Role save(Role role){
        roleRepository.save(role);
        return role;
    }

    public void deleteAll() {
        roleRepository.deleteAll();
    }

    public List<Role> findAll(){ return roleRepository.findAll(); }

    public Set<Role> checkRole(Set<String> strRoles){
        Set<Role> roles = new HashSet<>();
        Role userRole = roleRepository.findByName(ERole.ROLE_USER)
                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
        roles.add(userRole);
        if(strRoles!=null) {
            strRoles.forEach(role -> {
                switch (role) {
                    case "admin":
                        Role adminRole = roleRepository.findByName(ERole.ROLE_ADMIN)
                                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                        roles.add(adminRole);
                        break;
                    case "mod":
                        Role modRole = roleRepository.findByName(ERole.ROLE_MODERATOR)
                                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                        roles.add(modRole);
                        break;
                }
            });
        }
        return roles;
    }
}
