function updateVisitCount() {
    let visitCount = localStorage.getItem('visitCount') || 0;
    visitCount++;
    localStorage.setItem('visitCount', visitCount);
    document.getElementById('visitCount').textContent = `Profile View: ${visitCount}`;
}

updateVisitCount();