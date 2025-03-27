require("dotenv").config();

const knex = require("knex")(require("../../knexfile"));

const selectAllQuery = `
        SELECT *FROM branch;
`;

const selectByIDQuery = `
        SELECT *FROM branch WHERE id = ?;
`;

const createBranchQuery = `
        INSERT INTO branch(
        name ,
        )
        VALUES(?)
        RETURNING *;
`;

const updateBranchQuery = ` 
        UPDATE  branch
            SET 
                name = ?
            WHERE id = ?
            RETURNING *;
`;

const deleteBranchQuery = `
        DELETE FROM branch WHERE id = ?;
`;

const selectAll = async () => {
  try {
    const res = await knex.raw(selectAllQuery);
    return res.rows;
  } catch (e) {
    console.log("error from selectALl" + e.message);
  }
};

const selectByID_branch = async (id) => {
  try {
    const res = await knex.raw(selectByIDQuery, [id]);
    return res.rows;
  } catch (e) {
    console.log("error from selectById" + e.message);
  }
};

const createBranch = async (name) => {
  try {
    const res = await knex.raw(createBranchQuery, [name]);
    return res.rows;
  } catch (e) {
    console.log("Xatolik createBranch: " + e.message);
  }
};

const updateBranch = async (id, name) => {
  try {
    const res = await knex.raw(updateBranchQuery, [name, id]);
    return res.rows;
  } catch (e) {
    console.log("error from updateBranch" + e.message);
  }
};

const deleteBranch = async (id) => {
  try {
    const res = await knex.raw(deleteBranchQuery, [id]);
    return res.rows;
  } catch (e) {
    console.log("error from deleteBranch" + e.message);
  }
};

module.exports = {
  selectAll,
  selectByID_branch,
  createBranch,
  updateBranch,
  deleteBranch,
};
