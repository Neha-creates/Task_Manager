function formatTime(isoString){
    const date = new Date(isoString);
    return date.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit' });
}

async function showData(){
    const date = document.getElementById('date').value;
    if(!date){
        alert('Please select a date');
        return;
    }
    try {
        const res = await fetch('https://api.carbonintensity.org.uk/intensity/date');
        const data = await res.json();
        const table = document.getElementById('data-table');
        const tbody = table.querySelector('tbody');
        tbody.innerHTML = '';

        let dataT = data.data;
        console.log(dataT)
        dataT.forEach((row)=>{
            const tr = document.createElement('tr');
            tr.innerHTML = `
            <td>${formatTime(row.from)} - ${formatTime(row.to)}</td>
            <td>${row.intensity.actual ?? 'N/A'}</td>
            <td>${row.intensity.forecast}</td>
            <td>${row.intensity.actual ?? 'N/A'}</td>
            <td>${row.intensity.index}</td>
            `;
            tbody.appendChild(tr);
        });
        table.style.display = 'table';
        //console.log(inTensity)
    } catch (error) {
        alert('Error fetching data. Please try again later.');
        console.log(error);
    }
}