(function() {
    var meta;
    var div = document.createElement('div');

    function addDownloadLink(versionInfo, fileUrl) {
        var link = document.createElement('a');
        var verstr = meta.extensionName + "-" + versionInfo.version;
        link.href = fileUrl;
        link.innerText = "Download " + verstr;
        link.download = verstr + ".vsix"
        with(link.style) {
            display = "inline-block";
            borderRadius = "5px";
            border = "4px solid rgb(0, 122, 204)";
            backgorundColor = "white";
            padding = "5px 10px";
            fontWeight = "bolder";
        }
        div.appendChild(link);
    }

    try {
        meta = JSON.parse(document.querySelector('.vss-extension').innerText);
    } catch(e) {
        console.log('VSCED failed to parse extension meta data');
        console.log(e);
        return;
    }

    try {
        meta.versions.forEach(function(version) {
            var fileUrl;
            version.files.some(function(file) {
                if(file.assetType == 'Microsoft.VisualStudio.Services.VSIXPackage') {
                    fileUrl = file.source;
                    return true;
                }
                return false;
            })

            if(fileUrl)
                addDownloadLink(version, fileUrl);
        })
    } catch(e) {
        console.log('VSCED failed to figure out downloadl link');
        console.log(e);
        return;
    }

    with(div.style) {
        position = "fixed";
        right = bottom = "0";
        zOrder = "-10";
        padding = "1em";
        fontSize = "1.5em";
    }
    document.body.appendChild(div);

    console.log(meta);
})();