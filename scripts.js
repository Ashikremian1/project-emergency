window.onload = function () {
    let heartCounter = document.querySelector(".heart-number");

    let heartNumber = document.getElementsByClassName("heart-1");

    for (let i = 0; i < heartNumber.length; i++) {
        heartNumber[i].addEventListener("click", function(){
            let current = parseInt(heartCounter.textContent) || 0;
            heartCounter.textContent = current + 1;
        })
    }


    const coinDisplay = document.getElementById("coin-number");
    let coins = parseInt(coinDisplay.textContent) || 100;


    const callBtns = document.querySelectorAll(".calling-btn");
    const historyContainer = document.querySelector('.history-entries');

callBtns.forEach(btn => {
    btn.addEventListener('click', () => {

        if(coins < 20){
            alert("Not enough coins!");
            return;
        }

        coins -=20;
        coinDisplay.textContent = coins;

        const cardContainer = btn.closest('.card-container');
        const callNum = cardContainer.querySelector('.calling-num').textContent;
        const serviceName = cardContainer.querySelector('.service-name').textContent;

        alert('Calling ' + callNum);

        if (historyContainer) {
            const now = new Date();
            const timeString = now.toLocaleTimeString([],{
                hour: '2-digit', minute: '2-digit', hour12: true});
            

            const entry = document.createElement('div');
            entry.classList.add('history-entry');
            entry.innerHTML = `
            <p><strong>${serviceName}</strong>, ${callNum} <span style="float:right;">${timeString}</span></p>`;
            historyContainer.appendChild(entry);
        
        }

    });
});


const clearBtn = document.getElementById('clear-history');
if (clearBtn && historyContainer) {
    clearBtn.addEventListener('click', () => {
        historyContainer.innerHTML = '';
    });
}

const copyCounter = document.getElementById("copy-number");
const copyBtns = document.querySelectorAll(".copy-btn");

copyBtns.forEach(btn => {

    btn.addEventListener("click", () => {

    const cardContainer = btn.closest(".card-container");
    const callNum = cardContainer.querySelector(".calling-num").textContent;

    navigator.clipboard.writeText(callNum)
    .then(() => {
        let currentCopies = parseInt(copyCounter.textContent) || 0;
        copyCounter.textContent = currentCopies + 1;
        alert(callNum + " copied to clipboard!");
    })

    .catch(err => {
        console.error("Failed to copy: ",err);
    });
});

});

}

