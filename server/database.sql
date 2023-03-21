
create TABLE lofty_urls(
    id SERIAL PRIMARY KEY,
    url_address TEXT,
    width INTEGER,
    height INTEGER,
    created TIMESTAMP,
)

create TABLE lofty_cookies(
     id SERIAL PRIMARY KEY,
     name_cookies VARCHAR(255),
     value_cookies TEXT,
     domain VARCHAR(255),
     path_cookies VARCHAR(255),
     expires REAL,
     size INTEGER,
     http_only BOOLEAN,
     secure BOOLEAN,
     session_cookies BOOLEAN,
     same_site VARCHAR(20),
     same_party BOOLEAN,
     source_scheme VARCHAR(20),
     source_port INTEGER,
     url_id INTEGER,
     FOREIGN KEY (url_id) REFERENCES lofty_urls (id)
)
