import os
import json

jsonpath = '导出的Json'
with open(jsonpath, 'r', encoding='utf8') as f:
    alljson = []
    for i in f.readlines():
        alljson.append(json.loads(i))
    with open(jsonpath+'.ok.json', 'w', encoding='utf8') as f:
        f.write(json.dumps(alljson, ensure_ascii=False, sort_keys=True, indent=4))
