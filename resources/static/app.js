fetch('http://localhost:8080/api/courses',{}) // Use the correct port if different
fetch('http://localhost:8080/api/instances', {}) // Use the correct port if different
document.addEventListener("DOMContentLoaded", function () {
    const courseForm = document.getElementById('courseForm');
    const instanceForm = document.getElementById('instanceForm');

    const courseTableBody = document.querySelector('#courseTable tbody');
    const instanceTableBody = document.querySelector('#instanceTable tbody');

    // Fetch and display all courses
    function loadCourses() {
        fetch('/api/courses')
            .then(response => response.json())
            .then(data => {
                courseTableBody.innerHTML = '';
                data.forEach(course => {
                    let row = `<tr>
                        <td>${course.id}</td>
                        <td>${course.title}</td>
                        <td>${course.courseCode}</td>
                        <td>${course.description}</td>
                    </tr>`;
                    courseTableBody.innerHTML += row;
                });
            });
    }

    // Fetch and display all course instances
    function loadInstances() {
        fetch('/api/instances')
            .then(response => response.json())
            .then(data => {
                instanceTableBody.innerHTML = '';
                data.forEach(instance => {
                    let row = `<tr>
                        <td>${instance.id}</td>
                        <td>${instance.courseId}</td>
                        <td>${instance.year}</td>
                        <td>${instance.semester}</td>
                    </tr>`;
                    instanceTableBody.innerHTML += row;
                });
            });
    }

    // Submit new course
    courseForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const formData = new FormData(courseForm);
        const course = {
            title: formData.get('title'),
            courseCode: formData.get('courseCode'),
            description: formData.get('description')
        };

        fetch('/api/courses', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(course)
        })
            .then(response => response.json())
            .then(data => {
                alert('Course created successfully!');
                courseForm.reset();
                loadCourses();
            });
    });

    // Submit new course instance
    instanceForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const formData = new FormData(instanceForm);
        const instance = {
            courseId: formData.get('courseId'),
            year: formData.get('year'),
            semester: formData.get('semester')
        };

        fetch('/api/instances', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(instance)
        })
            .then(response => response.json())
            .then(data => {
                alert('Course instance created successfully!');
                instanceForm.reset();
                loadInstances();
            });
    });

    // Initial load
    loadCourses();
    loadInstances();
});
