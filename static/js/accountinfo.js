if (localStorage.getItem('targetedLanguage') != 'en') {

    let originalEnglishText = [];
    let translatedText = [];
    function collectInitialText() {
        originalEnglishText = [];
        document.querySelectorAll('[data-translate]').forEach(element => {
            originalEnglishText.push(element.textContent);
        });
    }
    collectInitialText();
    
    function translateAllElements() {
      const selectedLanguage = localStorage.getItem('targetedLanguage');
      if (selectedLanguage === 'en') {
        window.location.reload()
      }
      sessionStorage.setItem('targetedLanguage', selectedLanguage);
      fetch('/translate', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          }, 
          body: JSON.stringify({
              texts: originalEnglishText,
              target_lang: selectedLanguage,
          }),
      })
      .then(response => response.json())
      .then(data => {
          translatedText = data.translated_texts || [];
          document.querySelectorAll('[data-translate]').forEach((element, index) => {
              element.textContent = translatedText[index] || '';
          });
  
      })
      .catch(error => {
          console.error('Translation error:', error);
      });
    }
    translateAllElements();
}

var contactNumberInput = document.getElementById("contact-number");

contactNumberInput.addEventListener("focus", function() {
    if (!contactNumberInput.value.startsWith("+91")) {
        contactNumberInput.value = "+91 " + contactNumberInput.value;
    }
});

function savedetails() {

    var name = document.getElementById("name").value;
    var DOB = document.getElementById("DOB").value;
    var bloodGroupDropdown = document.getElementById("blood-group");
    var selectedBloodGroup = bloodGroupDropdown.value;
    var address = document.getElementById("address").value
    var contact_number = document.getElementById("contact-number").value

    var data = {
        "name": name,
        "DOB": DOB,
        "bloodgroup": selectedBloodGroup,
        "address": address,
        "contactnumber": contact_number
    };


    fetch('/savedetails', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json', 
        },
        body: JSON.stringify(data),
    })
    .then(response => response.json()) 
    .then(data => {
        alert(data.message);
        if (data.message === "Details Saved successfully!") {
            window.location.href = '/dashboard';
        } else {
            window.location.reload();
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
  

    return false;
}

var bloodGroup = document.getElementById('blood-group-value').value;
if (bloodGroup) {
    document.getElementById("blood-group").value = bloodGroup;
}

