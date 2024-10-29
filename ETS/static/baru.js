        // Module: Validasi Formulir
        const formValidation = (() => {
            const validateEmail = (email) => {
                const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
                return re.test(email);
            };
            
            const validateForm = (name, email, course) => {
                if (!name || !email || !course) {
                    alert("Semua kolom harus diisi.");
                    return false;
                }
                if (!validateEmail(email)) {
                    alert("Alamat email tidak valid.");
                    return false;
                }
                return true;
            };
            
            return {
                validateForm,
            };
        })();

        // Module: Pengelolaan Kursus
        const courseManagement = (() => {
            const courses = [
  
            ];

            const addCourse = (course) => {
                courses.push(course);
                UIUpdate.renderCourses();
            };

            const getCourses = () => courses;

            return {
                addCourse,
                getCourses,
            };
        })();

        // Module: Pembaruan UI
        const UIUpdate = (() => {
            const renderCourses = () => {
                const courseTableBody = document.getElementById("courseTableBody");
                courseTableBody.innerHTML = "";
                courseManagement.getCourses().forEach((course, index) => {
                    const row = document.createElement("tr");
                    row.innerHTML = `
                        <td>${index + 1}</td>
                        <td>${course.name}</td>
                        <td>${course.description}</td>
                    `;
                    courseTableBody.appendChild(row);
                });
            };

            const showNotification = (message) => {
                alert(message);
            };

            return {
                renderCourses,
                showNotification,
            };
        })();

        // Event Listeners
        document.getElementById("courseForm").addEventListener("submit", function(event) {
            event.preventDefault();
            const name = document.getElementById("name").value;
            const email = document.getElementById("email").value;
            const courseName = document.getElementById("course").value;

            if (formValidation.validateForm(name, email, courseName)) {
                const newCourse = { 
                    name: courseName, 
                    description: `Terdaftar oleh ${name} (${email})`
                };
                courseManagement.addCourse(newCourse);
                UIUpdate.showNotification(`Terima kasih, ${name}! Anda telah mendaftar untuk kursus ${courseName}.`);
                this.reset();
            }
        });

        // Initialize
        document.addEventListener("DOMContentLoaded", () => {
            UIUpdate.renderCourses();
        });