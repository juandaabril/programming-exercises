package com.example.repository;

import com.example.entity.User;
import java.util.List;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class UserRepository {

    private static final String FIND_BY_ID_QUERY = "SELECT id, name FROM \"user\" WHERE id = ?";
    private final JdbcTemplate jdbcTemplate;

    public Optional<User> findById(String userId) {

        RowMapper<User> rowMapper =
                (rs, rowNum) -> new User(rs.getString("id"), rs.getString("name"));
        List<User> users = jdbcTemplate.query(FIND_BY_ID_QUERY, new Object[] {userId}, rowMapper);

        if (users.isEmpty()) {
            return Optional.empty();
        }

        return Optional.of(users.get(0));
    }
}
