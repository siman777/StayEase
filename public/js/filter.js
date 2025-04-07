document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".filter").forEach(filter => {
        filter.addEventListener("click", () => {
            const filterName = filter.textContent.trim();
            window.location.href = `/listing/filter/${encodeURIComponent(filterName)}`;
        });
    });
});
