module.exports = {
    "name": "livepool",
    "type": "root",
    "children": [
        {
            "name": "project1",
            "type": "proj",
            "id": "2a705271-5fa8-d785-db66-354abeaec96a",
            "checked": true,
            "children": [
                {
                    "name": "handle",
                    "type": "group",
                    "checked": true,
                    "id": "9d94c6c9-8ef2-5e86-7791-d0897617f62e",
                    "children": [
                        // {
                        //     "id": "123123123123123",
                        //     "match": "www.qq.com",
                        //     "action": "14.17.42.40",
                        //     "checked": true
                        // },
                        // {
                        //     "id": "445236234231113",
                        //     "match": "www.qq.com",
                        //     "action": "file:E:/workspace/spice/README.md",
                        //     "checked": true
                        // },
                        {
                            "id": "xasdasd",
                            "match": "y.qq.com",
                            "checked": true,
                            "action": "113.107.238.13"
                        },

                        {
                            "id": "1746f2e5-31ab-5328-4452-c5d19da65f8a",
                            "match": "find.qq.com/js/delay.js",
                            "action": "delay(5)",
                            "checked": true
                        },
                        {
                            "match": "find.qq.com/js/find.all.js",
                            "action": "./tools/find.all.qzmin",
                            "checked": true,
                            "id": "a611fd05-ebe8-e83b-7212-73473eb8e033"
                        },
                        {
                            "match": "find.qq.com/css/comp.css",
                            "action": "./css/main.css|./css/sub1.css",
                            "checked": true,
                            "id": "b75e98ad-9988-a722-6104-bb477daa4c90"
                        },
                        {
                            "match": "find.qq.com/js/catalog.js",
                            "action": "http://pub.idqqimg.com/qqfind/js/groupcatalog.js",
                            "checked": true,
                            "id": "8e38126c-1cc0-29e5-94a9-e8954e26bc2f"
                        },
                        {
                            "match": "find.qq.com/|*.idqqimg.com/qqfind/",
                            "action": "./",
                            "checked": true,
                            "id": "6fafab19-8c7a-8a66-0897-5aa613744b02"
                        },
                        {
                            "match": "find.qq.com/index.html",
                            "action": "./__index.html",
                            "checked": true,
                            "id": "77cd1499-9a17-de66-ffc9-e0cc60a4665e"
                        }
                    ]
                },
                {
                    "name": "proxy",
                    "type": "group",
                    "checked": false,
                    "id": "c86b0045-8d0c-da8d-2e12-d99fc941dd54",
                    "children": [
                        {
                            "match": "find.qq.com/cgi-bin/|cgi.find.qq.com",
                            "action": "-",
                            "checked": true,
                            "id": "35e14aaf-ce33-0c65-2a7b-62edbb4524fa"
                        },
                        {
                            "match": "find.qq.com|idqqimg.com/qqfind/",
                            "action": "10.12.23.156",
                            "checked": true,
                            "id": "c8a84960-35f9-9cfb-4df1-1bbaf7acb039"
                        }
                    ]
                }
            ]
        },
        {
            "name": "project2",
            "type": "proj",
            "checked": false,
            "id": "5fd6d6ee-73ae-841c-8ae4-ab1770609551",
            "children": [
                {
                    "name": "handle",
                    "type": "group",
                    "checked": false,
                    "id": "cdb6c3c2-af93-bae6-3a44-5f97903ed38c",
                    "children": [
                        {
                            "match": "find.qq.com/index.html",
                            "action": "./__index.html",
                            "checked": false,
                            "id": "d583042f-ceab-fcf5-fe15-fee4a4c9c0b2"
                        },
                        {
                            "match": "find.qq.com/js/find.all.js",
                            "action": "./tools/find.all.qzmin",
                            "checked": false,
                            "id": "8805f02e-ac71-178f-a293-e545281af556"
                        },
                        {
                            "match": "find.qq.com/js/find.combo.js",
                            "action": "./js/jquery.js|./js/main.js",
                            "checked": false,
                            "id": "9dddd47a-357d-7829-7fec-09a4945c2bb5"
                        },
                        {
                            "match": "find.qq.com/css/comp.css",
                            "action": "./css/main.css|./css/sub1.css",
                            "checked": false,
                            "id": "4b59d260-75d9-ad31-a1e6-20007701039e"
                        },
                        {
                            "match": "find.qq.com/js/catalog.js",
                            "action": "http://pub.idqqimg.com/qqfind/js/groupcatalog.js",
                            "checked": false,
                            "id": "9f9a9e84-ff4e-bf15-a7ec-1743be11659f"
                        },
                        {
                            "match": "find.qq.com/|*.idqqimg.com/qqfind/",
                            "action": "./",
                            "checked": false,
                            "id": "dccd5242-b249-d4d6-3b46-eb81771a5eb3"
                        }
                    ]
                },
                {
                    "name": "proxy",
                    "id": "a3bdec54-ec42-1f5e-ef1e-dbe6b6d73ab8",
                    "type": "group",
                    "checked": false,
                    "children": [
                        {
                            "match": "find.qq.com/cgi-bin/|cgi.find.qq.com",
                            "action": "-",
                            "checked": false,
                            "id": "6f08c12f-fa2d-9e67-bb30-ef885ff87552"
                        },
                        {
                            "match": "find.qq.com|idqqimg.com/qqfind/",
                            "action": "172.23.136.84",
                            "checked": false,
                            "id": "012a8530-5f8b-7672-dcec-1f63af21e791"
                        }
                    ]
                }
            ]
        }
    ]
};
