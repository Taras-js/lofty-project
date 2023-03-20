
create TABLE urls(
    id SERIAL PRIMARY KEY,
    url_address VARCHAR(255),
    width INTEGER,
    height INTEGER
)

create TABLE cookies(
    id SERIAL PRIMARY KEY,
    name_cookies VARCHAR(255),
    value_cookies VARCHAR(255),
    domain VARCHAR(255),
    path_cookies VARCHAR(255),
    expires INTEGER,
    size INTEGER,
    http_only BOOLEAN,
    secure BOOLEAN,
    session_cookies BOOLEAN,
    same_site VARCHAR(20),
    same_party BOOLEAN,
    source_scheme VARCHAR(20),
    source_port INTEGER,
    url_id INTEGER,
    FOREIGN KEY (url_id) REFERENCES urls (id)
)
