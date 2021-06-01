var vaccins = [
    {
        nom_vaccin: "Vaccin covid 19", 
        type_vaccin: "covid 19", 
        doses : [
            {
                nomination: "1ère dose",
                status: 1,
                date: "12/01/2021",
                lieu: "Antananarivo",
                pays: "MADAGASCAR"
            },
            {
                nomination: "2ème dose",
                status: 1,
                date: "25/07/2021",
                lieu: "Antananarivo",
                pays: "MADAGASCAR"
            }
        ]
    },
    {
        nom_vaccin: "Vaccin kitrotro", 
        type_vaccin: "kitrotro", 
        doses : [
            {
                nomination: "1ère dose",
                status: 1,
                date: "12/01/2021",
                lieu: "Antananarivo",
                pays: "MADAGASCAR"
            }, {
                nomination: "2ème dose",
                status: 0,
            }
        ]
    }
]

exports.vaccins = vaccins;