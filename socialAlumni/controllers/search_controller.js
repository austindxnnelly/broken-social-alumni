function string_normalize(s) {
    return s.toLowerCase();
}

// string_match: returns true if search_string is a substring of data_string
function string_match(property, search) {
    let d = String.property;
    let s = String.search;
    return property.includes(search)
}

function isString (input){
    return typeof input
}
// search_string: filters the birds which do contain `search` in any property
function search_string(users, search) {
    return users.filter(b => (
        string_match(b.first_name, search)
        || string_match(b.last_name, search)
        || string_match(b.email, search)
    ))
}

function filter_users(search, all_users) {

    var results = all_users;
        // filter by search string
        if (search !== undefined && search !== "") {
            results = search_string(results, search);
        }

        return results
}

module.exports = { filter_users }