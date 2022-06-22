const { exec } = require("../db/mysql");
const xss = require("xss");

const getList = async (author, keyword) => {
  let sql = `select id, title, content, createTime, author from blogs where 1 = 1`;
  if (author) {
    sql += ` and author = '${author}'`;
  }
  if (keyword) {
    sql += ` and title like '%${keyword}%'`;
  }
  sql += ` order by createTime desc;`;

  return await exec(sql);
};

const getDetail = async (id) => {
  const sql = `select id, title, content, createTime, author from blogs where id = '${id}'`;
  const rows = await exec(sql);
  return rows[0];
};

const newBlog = async (blogData = {}) => {
  // blogData 是一个博客对象，包含 title、content、author 属性
  blogData = {
    ...blogData,
    createTime: Date.now(),
    id: 3, // 表示新建博客，插入到数据表里面的 id
  };
  const { title, content, author, createTime } = blogData;
  const sql = `
    insert into blogs (title, content, createTime, author) 
    values 
    ('${xss(title)}', '${xss(content)}', ${createTime}, '${author}');`;
  const insertData = await exec(sql);
  return {
    id: insertData.insertId,
  };
};

/**
 * 更新指定 id 的博客内容
 * @param {number} id 要更新博客的对应 id
 * @param {object} blogData 博客对象，包含 title、content 属性
 * @returns promise, 包含成功或失败提示信息
 */
const updateBlog = async (id, blogData = {}) => {
  const { title, content } = blogData;
  const sql = `
    update blogs set 
    title = '${xss(title)}', content = '${xss(content)}'
    where
    id = ${id}
  `;
  const updatedData = await exec(sql);
  return updatedData.affectedRows > 0;
};

/**
 * 根据 id 删除博客
 * @param {number} id
 * @param {string} author
 * @returns boolean 删除成功
 */
const delBlog = async (id, author) => {
  const sql = `
    delete from blogs 
    where id = '${id}' and author = '${author}';
  `;
  const delData = await exec(sql);
  return delData.affectedRows > 0;
};

module.exports = {
  getList,
  getDetail,
  newBlog,
  updateBlog,
  delBlog,
};
