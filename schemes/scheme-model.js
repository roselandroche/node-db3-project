const db = require("../data/db-config")

function find() {
    return db("schemes").select("*")
}

function findById(id) {
    return db("schemes").where({ id }).first()
}

// SELECT "Schemes".scheme_name, "Steps".step_number, "Steps".instructions FROM "Schemes"
// JOIN "Steps" 
// ON "Schemes".Id = "Steps".scheme_id
// ORDER BY "Schemes".scheme_name, "Steps".step_number;
async function findSteps(id) {
    await db("schemes").where({ id })
        .join("steps", "schemes.id", "steps.scheme_id")
        .select("schemes.scheme_name", "steps.step_number", "steps.instructions")
        .orderBy("schemes.scheme_name", "steps.step_number")
}

async function add(scheme) {
    const [id] = await db("schemes").insert(scheme)
    return db("schemes").where({ id }).first()
}

async function update(changes, id) {
    await db("schemes")
        .where({ id })
        .update(changes)
    return findById(id)
}

function remove(id) {
    return db("schemes").where({ id }).del()
}

module.exports = {
    find,
    findById,
    findSteps,
    add,
    update,
    remove
}