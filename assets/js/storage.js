// Key Penyimpanan
const KEY_VALUE = "dataKalkulator";

// Mendeklarasikan Event
document.querySelector("#delete").addEventListener("click", resetData);
document.querySelector("#close").addEventListener("click", () => {
    const overlay = document.querySelector(".overlay");
    overlay.classList.add("hide");
});
document.querySelector(".history").addEventListener("click", openWidget);

// Fungsi
function getRecords() {
    if (isStorageOK()) {
        const dataVal = localStorage.getItem(KEY_VALUE);
        const result = JSON.parse(dataVal);

        if (result !== null) {
            return result;
        } else {
            return [];
        }
    } else {
        return [];
    }
}

function isStorageOK() {
    return typeof Storage !== "undefined";
}

function addRecord(newData) {
    if (isStorageOK()) {
        const data = getRecords();
        data.push(newData);

        localStorage.setItem(KEY_VALUE, JSON.stringify(data));
    }
}

function resetData() {
    if (isStorageOK() && getRecords()) {
        localStorage.removeItem(KEY_VALUE);
        updateData();
    }
}

function updateData() {
    const data = getRecords();
    const tbody = document.querySelector("tbody");

    tbody.innerHTML = "";

    if (data && data.length > 0) {
        for (const row of data) {
            const tr = document.createElement("tr");
            const angka1 = document.createElement("td");
            const operator = document.createElement("td");
            const angka2 = document.createElement("td");
            const hasil = document.createElement("td");

            angka1.innerText = String(row.firstOperand);
            angka2.innerText = String(row.secondOperand);
            operator.innerText = String(row.operator);
            hasil.innerText = String(row.result);

            tr.appendChild(angka1);
            tr.appendChild(operator);
            tr.appendChild(angka2);
            tr.appendChild(hasil);
            tbody.appendChild(tr);
        }
    } else {
        const tr = document.createElement("tr");
        const td = document.createElement("td");
        td.setAttribute("colspan", "4");
        td.classList.add("nodata");
        td.innerText = "Belum ada data disini";
        tr.appendChild(td);

        tbody.appendChild(tr);
    }
}

function openWidget() {
    const overlay = document.querySelector(".overlay");
    overlay.classList.remove("hide");

    updateData();
}
