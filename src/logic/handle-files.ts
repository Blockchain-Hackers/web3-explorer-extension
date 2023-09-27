export function export2JSON(data: any) {
  const a = document.createElement("a");
  a.href = URL.createObjectURL(new Blob([JSON.stringify(data, null, 2)], {
    type: "application/json"
  }));
  a.setAttribute("download", "export.json");
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

export async function readFile(file: any): Promise<any> {
  if (file) {
    var reader = new FileReader();
    return new Promise((resolve, reject) => {
      reader.readAsText(file, "UTF-8");
      reader.onload = function (evt) {
        const result = evt.target?.result
        if (typeof result === "string") {
          const parsed = JSON.parse(result)
          resolve(parsed)
        }
      }

      reader.onerror = function (evt) {
        reject(evt)
      }
    })
  }
}