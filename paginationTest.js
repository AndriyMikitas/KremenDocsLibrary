async function getPreciseData(pageNumber) {
    const response = await fetch(`https://rest.kremen.org.ua/api/getpage/6/${pageNumber-1}`);

    const data = await response.json();
    console.log(data)
    return data;
}

async function main() {
    const postsData = await getPreciseData(1);
    let currentPage = 1;
    let rows = 10;

    async function displayList(arrData, rowPerPage, page) {
        const postsEl = document.querySelector('.posts');
        postsEl.innerHTML = "";


        const pagesCount = Math.ceil(arrData.allrecordcount / rowPerPage);

            arrData = await getPreciseData(page);

            const paginatedData = arrData.rows;


            paginatedData.forEach((el) => {
                const postEl = document.createElement("div");
                postEl.classList.add("post");
                postEl.innerHTML = `<div class="row">
                                    <div class="col-1">${el.id_project}</div>
                                    <div class="col-6">${el.project_zmist}</div>
                                    <div class="col-2">${el.project_date}</div>
                                    <div class="col-1">${el.id_session}</div>
                                    <div class="col-1">${el.last_changes}</div>
                                    <div class="col-1">${el.project_files} </div>
                                    </div>`;
                postsEl.appendChild(postEl);
            })
    }

    function displayPagination(arrData, rowPerPage, page) {
        document.querySelector('.pagination').innerHTML = "";
        const paginationEl = document.querySelector('.pagination');
        const pagesCount = Math.ceil(arrData.allrecordcount / rowPerPage);
        const ulEl = document.createElement("ul");
        ulEl.classList.add('pagination__list');
        const liEl = displayPaginationBtn(1);
        ulEl.appendChild(liEl)
        console.log(liEl)

        for (let i = page-5; i < page+5; i++) {
            if (i<1){continue}
            if (i>pagesCount-2) {break}
            const liEl = displayPaginationBtn(i + 1);
            ulEl.appendChild(liEl)
        }
        const lastliEl = displayPaginationBtn(pagesCount);
        ulEl.appendChild(lastliEl)
        paginationEl.appendChild(ulEl)
    }

    function displayPaginationBtn(page) {
        const liEl = document.createElement("li");
        liEl.classList.add('pagination__item')
        liEl.innerText = page
        if (currentPage === page) liEl.classList.add('pagination__item--active');

        liEl.addEventListener('click', () => {
            currentPage = page
            displayList(postsData, rows, currentPage)
            displayPagination(postsData, rows, currentPage);

            liEl.classList.add('pagination__item--active');
        })

        return liEl;
    }






    displayList(postsData, rows, currentPage);
    displayPagination(postsData, rows, currentPage);

}

main();
