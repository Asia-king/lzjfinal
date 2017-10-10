var s = ""
s += "<object id=WebOffice1 height='100%' width='100%' style=''  classid='clsid:E77E049B-23FC-4DB8-B756-60529A35FAD5' codebase=WebOffice.cab#V6,0,2,0>"
s +="<param name='_ExtentX' value='6350'><param name='_ExtentY' value='6350'>"
s +="</OBJECT>"
document.write(s);
document.all.WebOffice1.HideMenuItem(0x01+0x1000+0x02+0x04+0x10+0x20);

