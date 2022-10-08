
    //JS code
    var txtInput = document.querySelector('#input');
    var voiceList = document.querySelector('#voiceList');
    var speak= document.querySelector('#speak');
    var pause= document.querySelector('#pause');
    var resume= document.querySelector('#resume');
    var synth = window.speechSynthesis;
    var voices = [];

    PopulateVoices();
    if(speechSynthesis !== undefined){
        speechSynthesis.onvoiceschanged = PopulateVoices;
    }
         
    //speak
    speak.addEventListener('click', ()=> 
    {
        var toSpeak = new SpeechSynthesisUtterance(txtInput.value);
        var selectedVoiceName = voiceList.selectedOptions[0].getAttribute('data-name');
        voices.forEach((voice)=>
        {
            if(voice.name === selectedVoiceName)
            {
                toSpeak.voice = voice;
            }
        });
        
        synth.speak(toSpeak);
    });

    function PopulateVoices()
    {
        voices = synth.getVoices();
        var selectedIndex = voiceList.selectedIndex < 0 ? 0 : voiceList.selectedIndex;
        voiceList.innerHTML = '';
        voices.forEach((voice)=>
        {
            var listItem = document.createElement('option');
            listItem.textContent = voice.name;
            listItem.setAttribute('data-lang', voice.lang);
            listItem.setAttribute('data-name', voice.name);
            voiceList.appendChild(listItem);
        });

        voiceList.selectedIndex = selectedIndex;
    }
   
    //PAUSE 
    pause.addEventListener('click', ()=> 
    {
        window.speechSynthesis.pause(); 
    }); 
   
    //RESUME button
    resume.addEventListener('click', ()=> 
    {
        window.speechSynthesis.resume(); 
    });
