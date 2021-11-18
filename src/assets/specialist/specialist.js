export function specialistName() {
    let listData = [
        {
            id: '01',
            name: "Internist",
        },
        {
            id: "02",
            name: "Plastic Surgeons"
        },
        {
            id: '03',
            name: "Physiatrists",
        },
        {
            id: '04',
            name: "Pediatrician",
        },
    ]

    return listData.sort(function (a, b) {
        return (a.name.toLowerCase() > b.name.toLowerCase())
    })
}