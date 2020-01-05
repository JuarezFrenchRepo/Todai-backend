exports.up = function(knex) {
    return (
      knex.schema
  
        /// users table ///
        .createTable("user_profile", tbl => {
          tbl.increments();
  
          tbl
            .string("username", 255)
            .notNullable()
            .unique();
          tbl.string("password", 255).notNullable();
          tbl.string("email", 255)
          .notNullable()
          .unique();
          tbl.string("phone", 32);
        })
  
        ///projects table///
  
        .createTable("projects", tbl => {
          tbl.increments();
          tbl
            .string("name", 255)
            .notNullable()
            .unique();
  
          tbl.string("description", 255).notNullable();
  
          tbl
            .integer("user_id", 255)
            .notNullable()
            .references("id")
            .inTable("user")
            .onDelete("RESTRICT")
            .onUpdate("CASCADE");
  
          tbl
            .integer("value_id", 255)
            .notNullable()
            .references("values")
            .inTable("user")
            .onDelete("RESTRICT")
            .onUpdate("CASCADE");
        })
  
        /// values table ///
  
        .createTable("values", tbl => {
          tbl.increments();
          tbl
            .string("value", 255)
            .notNullable()
            .unique();
  
          tbl.string("description", 255).notNullable();
  
          tbl.boolean("top-pick");
  
          tbl
            .integer("user_id", 255)
            .notNullable()
            .references("id")
            .inTable("user")
            .onDelete("RESTRICT")
            .onUpdate("CASCADE");
  
          tbl
            .integer("value_id", 255)
            .notNullable()
            .references("id")
            .inTable("values")
            .onDelete("RESTRICT")
            .onUpdate("CASCADE");
        })
  
        /// project_values table ///
  
        .createTable("project_values", tbl => {
          tbl.increments();
          tbl
            .integer("project_id", 255)
            .notNullable()
            .references("id")
            .inTable("projects")
            .onDelete("RESTRICT")
            .onUpdate("CASCADE");
  
          tbl
            .integer("value_id", 255)
            .notNullable()
            .references("id")
            .inTable("values")
            .onDelete("RESTRICT")
            .onUpdate("CASCADE");
        })
    );
  };
  
  exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists("tbl");
  };
  