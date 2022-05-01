const sequelize = require('../db');
const {DataTypes} = require('sequelize');

const User = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    email: {type: DataTypes.STRING, unique: true },
    password: {type: DataTypes.STRING}
});

const Admin = sequelize.define('admin', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    email: {type: DataTypes.STRING, unique: true },
    password: {type: DataTypes.STRING},
    name: {type: DataTypes.STRING, allowNull: false, defaultValue: 'Administrator'},
    img: {type: DataTypes.STRING, allowNull: false, defaultValue: ''},
    phone: {type: DataTypes.STRING, allowNull: false, defaultValue: 'set phone'}
});

const Manager = sequelize.define('manager', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    email: {type: DataTypes.STRING, unique: true },
    password: {type: DataTypes.STRING},
    name: {type: DataTypes.STRING, allowNull: false, defaultValue: 'Manager'},
    img: {type: DataTypes.STRING, allowNull: false, defaultValue: ''},
    phone: {type: DataTypes.STRING, allowNull: false, defaultValue: 'set phone'}
});

const Center = sequelize.define('center', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, defaultValue: 'No name'},
    description: { type: DataTypes.STRING, defaultValue: 'Описание не задано' },
});


const Teacher = sequelize.define('teacher', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    email: {type: DataTypes.STRING, unique: true },
    password: {type: DataTypes.STRING},
    name: {type: DataTypes.STRING, allowNull: false},
    img: {type: DataTypes.STRING, allowNull: false,  defaultValue: ''},
    qualification: {type: DataTypes.ARRAY(DataTypes.STRING), allowNull: false, defaultValue: []},
    phone: {type: DataTypes.STRING, allowNull: false, defaultValue: 'set phone'}
});

const Student = sequelize.define('student', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    email: {type: DataTypes.STRING, unique: true },
    password: {type: DataTypes.STRING},
    name: {type: DataTypes.STRING, allowNull: false},
    parentName: {type: DataTypes.STRING, allowNull: false, defaultValue: "parent name"},
    img: {type: DataTypes.STRING, allowNull: false },
    phone: {type: DataTypes.STRING, allowNull: false, defaultValue: 'student phone'},
    parentPhone: {type: DataTypes.STRING, allowNull: false, defaultValue: 'set parent phone'},
    birthday: {type: DataTypes.STRING, allowNull: false},
    balance: {type: DataTypes.INTEGER, allowNull: false, defaultValue: 0},
});


const Lead = sequelize.define('lead', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING,  allowNull: false},
    phone: {type: DataTypes.STRING, allowNull: false, defaultValue: 'set phone'},
    note: {type: DataTypes.STRING, allowNull: false, defaultValue: 'set some note'}
});

const Role = sequelize.define('role', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type:  DataTypes.STRING, allowNull: false }
});

const LeadStatus = sequelize.define('lead_status', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name:{ type:  DataTypes.STRING, unique: true, allowNull: false }
});

const TeacherStudent = sequelize.define('teacher_student',{
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});

const Task = sequelize.define('task', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: { type: DataTypes.STRING, allowNull: false },
    label: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.STRING, allowNull: false, defaultValue: 'Описание не задано' },
    expirationDate: { type: DataTypes.DATEONLY, defaultValue: Date.now() }
});

const TaskCategory = sequelize.define('task_category', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type:  DataTypes.STRING, unique: true, allowNull: false }
});

const Subscription = sequelize.define('subscription', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, unique: true, allowNull: false },
    cost: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 400 },
    classCost: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
    classAmount: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
    classDuration: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
    note: {type: DataTypes.STRING, allowNull: false, defaultValue: 'Описание не задано'}
});

const Billing = sequelize.define('billing', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, unique: true, allowNull: false }
});

const Group = sequelize.define('group', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type:  DataTypes.STRING, unique: true, allowNull: false },
    limit: { type:  DataTypes.INTEGER, allowNull: false, defaultValue: 30 },
    note: {type: DataTypes.STRING, defaultValue: 'Описание не задано'}
});

const RegularClasses = sequelize.define('regular_classes', { // temp leave than modify and toggle with Group and Course and Level
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type:  DataTypes.STRING, unique: true, allowNull: false },
    duration: { type:  DataTypes.INTEGER, defaultValue: 90 },
    scheduleStart: { type:  DataTypes.TIME, allowNull: false },
    scheduleEnd: { type:  DataTypes.TIME, allowNull: false },
    weekDays: { type: DataTypes.ARRAY(DataTypes.STRING), allowNull: false },
    topic: { type: DataTypes.STRING, allowNull: false,  defaultValue: ''},
    periodStart: { type: DataTypes.DATEONLY, allowNull: false, defaultValue: DataTypes.NOW },
    periodEnd: { type: DataTypes.DATEONLY, allowNull: false },
});


const SingleClass = sequelize.define('single_class', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    classState: { type: DataTypes.STRING, allowNull: false, defaultValue: 'запланирован'},
    day: { type: DataTypes.STRING, allowNull: false},
    dayDate: { type: DataTypes.DATEONLY, allowNull: false},
    durationLong: { type:  DataTypes.INTEGER, defaultValue: 90 },
    timeStart: { type:  DataTypes.TIME, allowNull: false },
    timeEnd: { type:  DataTypes.TIME, allowNull: false },
    topicSingle: { type: DataTypes.STRING, allowNull: false,  defaultValue: ''}
    // classType: { type: DataTypes.STRING, allowNull: false, defaultValue: ''},
    // classTime: { type: DataTypes.STRING, allowNull: false, defaultValue: ''},
    // classBranch: { type: DataTypes.STRING, allowNull: false, defaultValue: ''},
    // classRoom: { type: DataTypes.STRING, allowNull: false, defaultValue: ''},
    // classCourse: { type: DataTypes.STRING, allowNull: false, defaultValue: ''},
    // classGroup: { type: DataTypes.STRING, allowNull: false, defaultValue: ''},
    // classTeacher: { type: DataTypes.STRING, allowNull: false, defaultValue: ''},
    // classStudents: { type: DataTypes.ARRAY(DataTypes.STRING), allowNull: false, defaultValue: []}
});

const GroupStatus = sequelize.define('group_status', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type:  DataTypes.STRING, unique: true, allowNull: false }
});

const StudentStatus = sequelize.define('student_status', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type:  DataTypes.STRING, unique: true, allowNull: false }
});

const Branch = sequelize.define('branch', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type:  DataTypes.STRING, unique: true, allowNull: false },
    address: { type:  DataTypes.STRING, defaultValue: 'Main branch' }
});

const Room = sequelize.define('room', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type:  DataTypes.STRING, unique: true, allowNull: false },
    description: { type: DataTypes.STRING, allowNull: false, defaultValue: 'Описание не задано' },
});

const Course = sequelize.define('course', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name:  { type:  DataTypes.STRING, unique: true, allowNull: false }
});

const CourseType = sequelize.define('course_type', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name:  { type:  DataTypes.STRING, unique: true, allowNull: false }
});

const Discount = sequelize.define('discount', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    amount:  { type:  DataTypes.INTEGER,allowNull: false, defaultValue: 0 }
});

const DiscountType = sequelize.define('discount_type', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name:  { type:  DataTypes.STRING, unique: true, allowNull: false },
    note: { type: DataTypes.STRING, allowNull: false, defaultValue: 'Описание не задано' }
});

const Level = sequelize.define('level', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name:  { type:  DataTypes.STRING, unique: true, allowNull: false }
});

const Gender = sequelize.define('gender', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name:{ type:  DataTypes.STRING, unique: true, allowNull: false }
});

const StudentGroup = sequelize.define('student_group',{
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});

const LeadGroup = sequelize.define('lead_group',{
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});

const GroupClasses = sequelize.define('group_classes',{
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});

const TeacherClasses = sequelize.define('teacher_classes',{
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});

const AdminRole = sequelize.define('admin_role',{
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});

const ManagerRole = sequelize.define('manager_role',{
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});

const StudentRole = sequelize.define('student_role',{
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});

const TeacherRole = sequelize.define('teacher_role',{
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});

User.hasMany(Admin);
Admin.belongsTo(User);

User.hasMany(Manager);
Manager.belongsTo(User);

User.hasMany(Teacher);
Teacher.belongsTo(User);

User.hasMany(Student);
Student.belongsTo(User);


Admin.hasOne(Center);
Center.belongsTo(Admin);

Center.hasMany(Teacher);
Teacher.belongsTo(Center);
Center.hasMany(Student);
Student.belongsTo(Center);
Center.hasMany(Lead);
Lead.belongsTo(Center);
Center.hasMany(Subscription);
Subscription.belongsTo(Center);
Center.hasMany(Task);
Task.belongsTo(Center);
Center.hasMany(TaskCategory);
TaskCategory.belongsTo(Center);
Center.hasMany(Branch);
Branch.belongsTo(Center);
Center.hasMany(Room);
Room.belongsTo(Center);
Center.hasMany(RegularClasses);
RegularClasses.belongsTo(Center);
Center.hasMany(Group);
Group.belongsTo(Center);
Center.hasMany(GroupStatus);
GroupStatus.belongsTo(Center);
Center.hasMany(Manager);
Manager.belongsTo(Center);
Center.hasMany(Role);
Role.belongsTo(Center);
Center.hasMany(Discount);
Discount.belongsTo(Center);
Center.hasMany(DiscountType);
DiscountType.belongsTo(Center);
Center.hasMany(Level);
Level.belongsTo(Center);
Center.hasMany(Billing);
Billing.belongsTo(Center);
Center.hasMany(LeadStatus);
LeadStatus.belongsTo(Center);
Center.hasMany(StudentStatus);
StudentStatus.belongsTo(Center);
Center.hasMany(Course);
Course.belongsTo(Center);
Center.hasMany(SingleClass);
SingleClass.belongsTo(Center);



Admin.belongsToMany(Role, { through: AdminRole });
Role.belongsToMany(Admin, { through: AdminRole });
Admin.hasMany(AdminRole);
AdminRole.belongsTo(Admin);
Role.hasMany(AdminRole);
AdminRole.belongsTo(Role);

Manager.belongsToMany(Role, { through: ManagerRole });
Role.belongsToMany(Manager, { through: ManagerRole });
Manager.hasMany(ManagerRole);
ManagerRole.belongsTo(Manager);
Role.hasMany(ManagerRole);
ManagerRole.belongsTo(Role);

Teacher.belongsToMany(Role, { through: TeacherRole });
Role.belongsToMany(Teacher, { through: TeacherRole });
Teacher.hasMany(TeacherRole);
TeacherRole.belongsTo(Teacher);
Role.hasMany(TeacherRole);
TeacherRole.belongsTo(Role);

Student.belongsToMany(Role, { through: StudentRole });
Role.belongsToMany(Student, { through: StudentRole });
Student.hasMany(StudentRole);
StudentRole.belongsTo(Student);
Role.hasMany(StudentRole);
StudentRole.belongsTo(Student);


Admin.hasMany(Teacher);
Teacher.belongsTo(Admin, {foreignKey: 'adminId'});

Admin.hasMany(Task);
Task.belongsTo(Admin, {foreignKey: 'adminId'});

Admin.hasMany(Student);
Student.belongsTo(Admin, {foreignKey: 'adminId'});

Admin.hasMany(Lead);
Lead.belongsTo(Admin, {foreignKey: 'adminId'});

Teacher.hasMany(Group);
Group.belongsTo(Teacher, {foreignKey: 'teacherId'});

Teacher.belongsToMany(Student, {through: TeacherStudent });
Student.belongsToMany(Teacher, {through: TeacherStudent });

Teacher.belongsToMany(RegularClasses, {through: TeacherClasses });
RegularClasses.belongsToMany(Teacher, {through: TeacherClasses });





Student.belongsToMany(Group, {through: StudentGroup });
Group.belongsToMany(Student, {through: StudentGroup });

Student.hasMany(StudentGroup);
StudentGroup.belongsTo(Student);
Group.hasMany(StudentGroup);
StudentGroup.belongsTo(Group);

Lead.belongsToMany(Group, {through: LeadGroup });
Group.belongsToMany(Lead, {through: LeadGroup });

Lead.hasMany(LeadGroup);
LeadGroup.belongsTo(Lead);
Group.hasMany(LeadGroup);
LeadGroup.belongsTo(Group);

GroupStatus.hasMany(Group);
Group.belongsTo(GroupStatus, {foreignKey: 'groupStatusId'});

LeadStatus.hasMany(Lead);
Lead.belongsTo(LeadStatus, {foreignKey: 'leadStatusId'});

Branch.hasMany(Group);
Group.belongsTo(Branch, {foreignKey: 'branchId'});

Branch.hasMany(Room);
Room.belongsTo(Branch, {foreignKey: 'branchId'});


Group.belongsToMany(RegularClasses, {through: GroupClasses});
RegularClasses.belongsToMany(Group, {through: GroupClasses});
Group.hasMany(GroupClasses);
GroupClasses.belongsTo(Group);
RegularClasses.hasMany(GroupClasses);
GroupClasses.belongsTo(RegularClasses);

Room.hasMany(RegularClasses);
RegularClasses.belongsTo(Room);

Course.hasMany(RegularClasses);
RegularClasses.belongsTo(Course);

CourseType.hasMany(RegularClasses);
RegularClasses.belongsTo(CourseType);


Level.hasMany(Group);
Group.belongsTo(Level);


Gender.hasMany(Admin);
Admin.belongsTo(Gender, {foreignKey: 'genderId'});
Gender.hasMany(Teacher);
Teacher.belongsTo(Gender, {foreignKey: 'genderId'});
Gender.hasMany(Student);
Student.belongsTo(Gender, {foreignKey: 'genderId'});
Gender.hasMany(Lead);
Lead.belongsTo(Gender, {foreignKey: 'genderId'});


StudentStatus.hasMany(Student);
Student.belongsTo(StudentStatus, {foreignKey: 'studentStatusId'});

Billing.hasMany(Subscription);
Subscription.belongsTo(Billing);

Subscription.hasMany(Student);
Student.belongsTo(Subscription, {foreignKey: 'subscriptionId'});

TaskCategory.hasMany(Task);
Task.belongsTo(TaskCategory, {foreignKey: 'taskCategoryId'});

DiscountType.hasMany(Discount);
Discount.belongsTo(DiscountType);

Discount.hasMany(Student);
Student.belongsTo(Discount);

RegularClasses.hasMany(SingleClass);
SingleClass.belongsTo(RegularClasses);

Room.hasMany(SingleClass);
SingleClass.belongsTo(Room);

Course.hasMany(SingleClass);
SingleClass.belongsTo(Course);

CourseType.hasMany(SingleClass);
SingleClass.belongsTo(CourseType);

// (async () => {
//     const role = Role.create({
//         id: '1',
//         name: 'ADMIN'
//     });
//     console.log(role)
// })();

// (async () => {
//     await sequelize.sync();
//
//     const courseType = await CourseType.create({
//         id: '1',
//         name: 'Individual'
//     });
//     console.log(courseType);
//
//     const discountType = await DiscountType.create({
//         id: '1',
//         name: 'Percentage discount'
//     });
//     console.log(discountType);
//
//     const course = await Course.create({
//         id: '1',
//         name: 'FrontEnd01',
//         courseTypeId: 1
//     });
//     console.log(course);
//
//     const discount = await Discount.create({
//         id: '1',
//         amount: 20,
//         discountTypeId: 1
//     });
//     console.log(discount);
//
//     const level = await Level.create({
//         id: '1',
//         name: 'Middle'
//     });
//     console.log(level);
//
//     const billing = await Billing.create({
//         id: '1',
//         name: 'For single class'
//     });
//     console.log(billing);
//
//
//     const gender = await Gender.create({
//         id: '1',
//         name: 'Male'
//     });
//     console.log(gender);
//
//     const groupStatus = await GroupStatus.create({
//         id: '1',
//         name: 'Active'
//     });
//     console.log(groupStatus);
//
//     const studentStatus = await StudentStatus.create({
//         id: '1',
//         name: 'Studying'
//     });
//     console.log(studentStatus);
//
//     const branch = await Branch.create({
//         id: '1',
//         name: 'Bishkek'
//     });
//     console.log(branch);
//
//     const room = await Room.create({
//         id: '1',
//         name: 'Room 32',
//         branchId: 1
//     });
//     console.log(room);
//
//
//     const subscription = await Subscription.create({
//         id: '1',
//         name: 'Basic for class',
//         cost: 10000,
//         classCost: 1000,
//         classAmount: 10,
//         classDuration: 60,
//         billingId: 1
//     });
//     console.log(subscription);
//
//     const admin = Admin.create({
//         id: '1',
//         email: 'akimov@gmail.com',
//         password: 'fly',
//         name: 'Zhoomart Akimov',
//         phone: '996772171263',
//         genderId: 1
//     });
//     console.log(admin)
//
//     const teacher = await Teacher.create({
//         id: '1',
//         email: 'teacher@gmail.com',
//         password: 'fly',
//         name: 'Teacher Main',
//         phone: '99688377373',
//         genderId: 1,
//         qualification: ["bachelor", "master"],
//         adminId: 1
//     });
//     console.log(teacher);
//
//
//     const group = await Group.create({
//         id: '1',
//         name: 'Group01',
//         limit: 30,
//         note: 'this is first default created group',
//         branchId: 1,
//         groupStatusId: 1,
//         teacherId: 1,
//         levelId: 1
//     });
//     console.log(group);
//
//     const regularClasses = await RegularClasses.create({
//         id: '1',
//         name: 'First Regular Class',
//         scheduleStart: '13:00:00',
//         scheduleEnd: '14:30:00',
//         weekDays: ["Monday", "Friday"],
//         courseId: 1,
//         roomId: 1,
//         courseTypeId: 1,
//         topic: 'JS arrays topic'
//     });
//     console.log(regularClasses);
//
//     const student = await Student.create({
//         id: '1',
//         email: 'student@gmail.com',
//         password: 'fly',
//         name: 'Student First',
//         phone: '997334444744',
//         parentName: "Kendy",
//         parentPhone: '121209092323',
//         discountId: 1,
//         genderId: 1,
//         adminId: 1,
//         img: "fbdaec4d-640d-464d-bc9d-66a4db92c86c.jpg",
//         studentStatusId: 1,
//         groupId: 1,
//         subscriptionId: 1,
//         birthday: '05/05/2006',
//         balance: 2000
//     });
//     console.log(student);
//
//
//     const teacherStudent = await TeacherStudent.create({
//         id: '1',
//         studentId: 1,
//         teacherId: 1
//     });
//     console.log(teacherStudent);
//
//     const studentGroup = await StudentGroup.create({
//         id: '1',
//         studentId: 1,
//         groupId: 1
//     });
//     console.log(studentGroup);
//
//     const groupClasses = await GroupClasses.create({
//         id: '1',
//         regularClassId: 1,
//         groupId: 1
//     });
//     console.log(groupClasses);
//
//     const teacherClasses =  await  TeacherClasses.create({
//         id: '1',
//         regularClassID: 1,
//         teacherId: 1
//     })
//     console.log(teacherClasses)
// })();
//
//
//


module.exports = {
    Admin,
    Teacher,
    Student,
    TeacherStudent,
    Subscription,
    TaskCategory,
    Task,
    Group,
    StudentGroup,
    StudentStatus,
    Branch,
    Course,
    GroupStatus,
    Lead,
    LeadStatus,
    LeadGroup,
    Room,
    RegularClasses,
    GroupClasses,
    Level,
    Gender,
    CourseType,
    Discount,
    DiscountType,
    Billing,
    TeacherClasses,
    SingleClass,
    Center,
    Role,
    Manager,
    AdminRole,
    ManagerRole,
    StudentRole,
    TeacherRole,
    User
}