const AUTHOR_MODEL = require('../model/authorModel')
const COURSE_MODEL = require('../model/courseModel')

async function createAuthor(name, bio, website) { 
    const NEW_AUTHOR = new AUTHOR_MODEL({
      name, 
      bio, 
      website 
    });
  
    const RESULT = await NEW_AUTHOR.save();
    console.log(RESULT);
}
  
async function createCourse(name, author) {
    const NEW_COURSE = new COURSE_MODEL({
      name, 
      author
    }); 
    
    const RESULT = await NEW_COURSE.save();
    console.log(RESULT);
}
  
async function listCourses() { 
    const COURSES = await COURSE_MODEL
      .find()
      .select('name');
    console.log(COURSES);
}

module.exports = createAuthor;
module.exports = createCourse;
module.exports = listCourses