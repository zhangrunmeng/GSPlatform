using ICSharpCode.SharpZipLib.Zip;
using SharpCompress.Archive;
using SharpCompress.Common;
using System;
using System.Collections.Generic;
using System.IO;
using System.IO.Compression;
using System.Linq;
using System.Web;

namespace GSPlatformPortal.Services
{
    public class ZipService
    {

        public static void Decompress(String source, String dest){
            if (!Directory.Exists(dest))
            {
                Directory.CreateDirectory(dest);
            }

            var archive = ArchiveFactory.Open(source);
            foreach (var entry in archive.Entries)
            {
                if (!entry.IsDirectory)
                {
                    entry.WriteToDirectory(dest, ExtractOptions.ExtractFullPath | ExtractOptions.Overwrite);
                }
            }
            archive.Dispose();
        }

        //public static void Decompress(String source, String dest)
        //{
        //    using (ZipArchive archive = ZipFile.open(source, ZipArchiveMode.update))
        //    {
        //        archive.createentryfromfile(source, "newentry.txt");
        //        archive.extracttodirectory(dest);
        //    }
        //}


        //public static HashSet<string> UnCompressPackageTo(string packagePath, string toPath, bool isOverride)
        //{
        //    HashSet<string> hsResult;
        //    Package pkg = Package.Open(packagePath, FileMode.Open, FileAccess.Read, FileShare.Read);
        //    try
        //    {
        //        //获取所有部件的Uri和源文件绝对路径
        //        var coll = from tmp in pkg.GetParts()
        //                   select new { PackPart = tmp, FullPath = Path.GetFullPath(tmp.Uri.OriginalString.Substring(1)) };
        //        if (coll.Count() == 0) //若没有要解压的文件
        //            return new HashSet<string>();
        //        //取得文件全路径中最短目录路径
        //        string strBaseDir = Path.GetDirectoryName(coll.ToList().OrderBy(
        //            c => { return Path.GetDirectoryName(c.FullPath).Length; }).First().FullPath);   //基础目录
        //        if (!coll.All(c => { return c.FullPath.IndexOf(strBaseDir) == 0; })) //若不是所有文件都有同一个基础目录则
        //            throw new InvalidOperationException("指定的包格式不正确");
        //        //获取解压后目标文件的全路径和源部件的集合
        //        var collDesc = from tmp in coll
        //                       select new
        //                       {
        //                           FullPath = Path.Combine(toPath, tmp.FullPath.Substring(strBaseDir.Length + 1)),   //Path.Combine("d:\\","\\s.1");返回"\s.1"
        //                           PackPart = tmp.PackPart
        //                       };
        //        hsResult = new HashSet<string>();
        //        foreach (var item in collDesc)
        //        {
        //            if (!isOverride && File.Exists(item.FullPath)) //若不要覆盖且已经存在文件
        //                continue;
        //            Directory.CreateDirectory(Path.GetDirectoryName(item.FullPath));    //创建文件的目录
        //            using (Stream source = item.PackPart.GetStream(FileMode.Open, FileAccess.Read),
        //                desc = new FileStream(item.FullPath, FileMode.Create, FileAccess.Write))
        //                CopyStream(source, desc);   //复制内容
        //            hsResult.Add(item.FullPath);
        //        }
        //    }
        //    finally
        //    {
        //        pkg.Close();
        //    }
        //    return hsResult;
        //}

        public static bool UnpackFiles2(string file, string dir)
        {
            if (!Directory.Exists(dir))
                Directory.CreateDirectory(dir);

            FastZip fastZip = new FastZip();
            fastZip.ExtractZip(file, dir, string.Empty);
            return true;
        }

        public static bool UnpackFiles(string file, string dir)
        {
            try
            {
                if (!Directory.Exists(dir))
                    Directory.CreateDirectory(dir);

                ZipInputStream s = new ZipInputStream(File.OpenRead(file));

                ZipEntry theEntry;
                while ((theEntry = s.GetNextEntry()) != null)
                {

                    string directoryName = Path.GetDirectoryName(theEntry.Name);
                    string fileName = Path.GetFileName(theEntry.Name);

                    if (directoryName != String.Empty)
                        Directory.CreateDirectory(dir + "/" + directoryName);

                    if (fileName != String.Empty)
                    {
                        FileStream streamWriter = File.Create(dir + theEntry.Name);
                        int size = 2048;
                        byte[] data = new byte[2048];
                        while (true)
                        {
                            size = s.Read(data, 0, data.Length);
                            if (size > 0)
                            {
                                streamWriter.Write(data, 0, size);
                            }
                            else
                            {
                                break;
                            }
                        }
                        streamWriter.Close();
                    }
                }
                s.Close();
                return true;
            }
            catch (System.Exception e)
            {
                throw e;
            }
        }
    }
}