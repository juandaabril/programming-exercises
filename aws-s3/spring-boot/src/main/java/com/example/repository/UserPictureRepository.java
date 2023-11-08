package com.example.repository;

import com.example.entity.UserPicture;
import java.util.List;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class UserPictureRepository {

    public static final String SAVE_QUERY =
            "INSERT INTO \"user_picture\" (id, user_id, name, url) VALUES (?, ?, ?, ?)";
    public static final String FIND_BY_USER_ID_AND_NAME_QUERY =
            "SELECT id, user_id, name, url FROM \"user_picture\" WHERE user_id = ? AND name = ?";

    private final JdbcTemplate jdbcTemplate;

    public void save(UserPicture picture) {
        jdbcTemplate.update(
                SAVE_QUERY,
                new Object[] {
                    picture.getId(), picture.getUserId(), picture.getName(), picture.getUrl()
                });
    }

    public Optional<UserPicture> findByUserIdAndName(String userId, String name) {
        RowMapper<UserPicture> rowMapper =
                (rs, rowNum) ->
                        new UserPicture(
                                rs.getString("id"),
                                rs.getString("user_id"),
                                rs.getString("name"),
                                rs.getString("url"));
        List<UserPicture> pictures =
                jdbcTemplate.query(
                        FIND_BY_USER_ID_AND_NAME_QUERY, new Object[] {userId, name}, rowMapper);

        if (pictures.isEmpty()) {
            return Optional.empty();
        }

        return Optional.of(pictures.get(0));
    }
}
