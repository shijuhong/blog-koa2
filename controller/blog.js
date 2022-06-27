const { exec } = require("../db/mysql");
const xss = require("xss");
const Blog = require("../models/Blog");

const getList = async (author, keyword) => {
  // let sql = `select id, title, content, createTime, author from blogs where 1 = 1`;
  // if (author) {
  //   sql += ` and author = '${author}'`;
  // }
  // if (keyword) {
  //   sql += ` and title like '%${keyword}%'`;
  // }
  // sql += ` order by createTime desc;`;

  // return await exec(sql);

  // 动态拼接查询条件
  const whereOpt = {};
  if (author) whereOpt.author = author;
  if (keyword) whereOpt.keyword = new RegExp(keyword);

  const list = await Blog.find(whereOpt).sort({ _id: -1 });
  return list;
};

const getDetail = async (id) => {
  // const sql = `select id, title, content, createTime, author from blogs where id = '${id}'`;
  // const rows = await exec(sql);
  // return rows[0];

  const blog = await Blog.findById(id);
  return blog;
};

const newBlog = async (blogData = {}) => {
  // // blogData 是一个博客对象，包含 title、content、author 属性
  // blogData = {
  //   ...blogData,
  //   createTime: Date.now(),
  // };
  // const { title, content, author, createTime } = blogData;
  // const sql = `
  //   insert into blogs (title, content, createTime, author)
  //   values
  //   ('${xss(title)}', '${xss(content)}', ${createTime}, '${author}');`;
  // const insertData = await exec(sql);
  // return {
  //   id: insertData.insertId,
  // };

  const { title, content, author } = blogData;
  const blog = await Blog.create({
    title: xss(title),
    content: xss(content),
    author,
  });

  return {
    id: blog._id,
  };
};

/**
 * 更新指定 id 的博客内容
 * @param {number} id 要更新博客的对应 id
 * @param {object} blogData 博客对象，包含 title、content 属性
 * @returns promise, 包含成功或失败提示信息
 */
const updateBlog = async (id, blogData = {}) => {
  // const { title, content } = blogData;
  // const sql = `
  //   update blogs set
  //   title = '${xss(title)}', content = '${xss(content)}'
  //   where
  //   id = ${id}
  // `;
  // const updatedData = await exec(sql);
  // return updatedData.affectedRows > 0;

  const { title, content } = blogData;
  const blog = await Blog.findOneAndUpdate(
    { _id: id },
    { title: xss(title), content: xss(content) },
    // 返回最新内容
    { new: true }
  );

  if (blog == null) return false;
  return true;
};

/**
 * 根据 id 删除博客
 * @param {number} id
 * @param {string} author
 * @returns boolean 删除成功
 */
const delBlog = async (id, author) => {
  // const sql = `
  //   delete from blogs
  //   where id = '${id}' and author = '${author}';
  // `;
  // const delData = await exec(sql);
  // return delData.affectedRows > 0;

  const blog = await Blog.findOneAndDelete({
    _id: id,
    author,
  });
  if (blog == null) return false;
  return true;
};

module.exports = {
  getList,
  getDetail,
  newBlog,
  updateBlog,
  delBlog,
};
