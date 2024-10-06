#[macro_use] extern crate rocket;


use rocket_dyn_templates::Template;
use rocket::fs::{FileServer, relative};
use std::collections::HashMap;


#[get("/")]
fn index() -> Template {
    let context: HashMap<String, String> = HashMap::new();
    Template::render("index", &context)
}

#[get("/about")]
fn about() -> Template {
    let context: HashMap<String, String> = HashMap::new();
    Template::render("about", &context)
}

#[get("/projects")]
fn projects() -> Template {
    let context: HashMap<String, String> = HashMap::new();
    Template::render("projects", &context)
}

#[get("/news")]
fn news() -> Template {
    let context: HashMap<String, String> = HashMap::new();
    Template::render("news", &context)
}

#[get("/impressum")]
fn impressum() -> Template {
    let context: HashMap<String, String> = HashMap::new();
    Template::render("impressum", &context)
}

#[get("/datenschutz")]
fn datenschutz() -> Template {
    let context: HashMap<String, String> = HashMap::new();
    Template::render("datenschutz", &context)
}


#[launch]
fn rocket() -> _{
    rocket::build()
        .mount("/", routes![index, about, projects, news, impressum, datenschutz])
        .mount("/static", FileServer::from(relative!("static")))
        .attach(Template::fairing())
}

