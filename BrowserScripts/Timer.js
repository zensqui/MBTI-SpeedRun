    let end = 0
    let pages = 9
    document.getElementsByClassName("question")[0].addEventListener("keydown", (a) => {
        if (a.key == "ArrowRight") {
            console.log("started")
            document.cookie = "started="+ Date.now()
        }
    })

    document.getElementsByClassName("btn btn-action")[2].addEventListener("keydown", (a) => {
        if (pages > 0) {
            pages--
            console.log(pages)
        } else {
            end = Date.now()
            console.log("end")
            console.log(end)
            console.log((end - parseInt(document.cookie.split("started=")[1].split(";")[0]))/1000)
            while (true) {
                pages = 0
            }
        }
    })
