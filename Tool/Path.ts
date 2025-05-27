
export class Path{
	static joint(rpath:string|undefined,lpath:string):string{
		console.log("rpath is",rpath,"lpath is",lpath)
		if(rpath==undefined)
		return lpath
		if(rpath.length==0 )
		return lpath;
	    if(rpath.length>0)
		return rpath+"/"+lpath
		if(lpath.length==0)
		return rpath
		throw new Error("path is worth")
	}
}