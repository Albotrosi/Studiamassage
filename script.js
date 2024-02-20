async function submitForm(event) {
  event.preventDefault();

  var fullName = document.getElementById('fullName').value;
  var dob = document.getElementById('dob').value;
  var phoneNumber = document.getElementById('phoneNumber').value;
  var preferredDateTime = document.getElementById('preferredDateTime').value;

  try {
    const response = await axios.post('/submit-form', {
      fullName,
      dob,
      phoneNumber,
      preferredDateTime,
    });

    if (response.data.success) {
      alert('Форма успешно отправлена!');
      var bookingForm = document.getElementById('bookingForm');
      bookingForm.reset(); // Сброс формы после успешной отправки
      bookingForm.style.display = 'none';
    } else {
      alert('Ошибка при отправке формы: ' + response.data.error);
    }
  } catch (error) {
    console.error('Ошибка при отправке формы:', error);
    alert('Произошла неожиданная ошибка. Пожалуйста, попробуйте снова.');
  }
}