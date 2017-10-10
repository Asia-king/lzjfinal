package com.huayue.common;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.Date;
import java.util.List;

import com.huayue.common.DateUtil;
import com.alibaba.fastjson.JSONObject;
import com.huayue.MyConfig;
import com.huayue.jbase.jfinal.ext.ctrl.JsonController;
import com.huayue.jbase.util.upload.FlashUpload;
import com.huayue.jbase.util.upload.KindEditor;
import com.huayue.service.ZbusMQServer;
import com.huayue.service.ZbusRPCMQServer;
import com.jfinal.core.Const;
import com.jfinal.ext.route.ControllerBind;
import com.jfinal.kit.PathKit;
import com.jfinal.plugin.zbus.sender.MqSender;
import com.jfinal.plugin.zbus.sender.Sender;
import com.jfinal.upload.UploadFile;

@ControllerBind(controllerKey = "/page/index")
public class FileController extends JsonController {

	public void flashUpload() throws IOException {

		renderJson(FlashUpload.flashUpload(getRequest()));

	}

	public void upload() {
		renderJson(KindEditor.upload(this));
	}

	public void fileManage() {
		renderJson(KindEditor.fileManage(getRequest()));
	}

	private static int imgCount = 0;

	public void index() {
		render(UrlConfig.VIEW_INDEX_UPLOAD);
	}

	public List<String> imageUpload() {// 返回文件存储相对路径

		UploadFile picString = getFile();

		if (picString != null) {
			String originalName = picString.getFileName();
			String extentionName = originalName.substring(originalName.lastIndexOf(".")); // 后缀名

			if (imgCount > 300)// 300为文件上传最大数目
				imgCount = 0;

			String newName = DateUtil.getCurrentTime() + "_" + imgCount + extentionName;// 新名
			imgCount++;
			String fileName = MyConfig.filePath + "//" + newName;// 文件完整路径
			picString.getFile().renameTo(new File(fileName)); // 重命名并上传文件
			// System.out.println(fileName);
			// 获取文件相对路径
			String projectName = PathKit.getWebRootPath().substring(PathKit.getWebRootPath().lastIndexOf('\\') + 1);
			StringBuffer relativePath = new StringBuffer(
					"//" + projectName + "//" + MyConfig.relativePath + "//" + newName);
			for (int i = relativePath.indexOf("//"); i != -1; i = relativePath.indexOf("//"))
				relativePath.deleteCharAt(i);
			List<String> reinfo = new ArrayList<String>();
			reinfo.add(0, fileName);
			reinfo.add(1, originalName);
			return reinfo;
			// return relativePath.toString();

		} else {
			return null;
		}

	}

	public void uploadFile() {
		String path = new SimpleDateFormat("yyyy/MM/dd").format(new Date());
		// UploadFile file = getFile("imgFile", PathKit.getWebRootPath() +
		// "/temp");
		UploadFile file = getFile("key", MyConfig.filePath + "/temp");

		File source = file.getFile();
		String fileName = file.getFileName();
		String extension = fileName.substring(fileName.lastIndexOf("."));
		String prefix;
		if (".png".equals(extension) || ".jpg".equals(extension) || ".gif".equals(extension)) {
			prefix = "img";
			fileName = generateWord() + extension;
		} else {
			prefix = "file";
		}
		JSONObject json = new JSONObject();
		try {
			FileInputStream fis = new FileInputStream(source);
			File targetDir = new File(MyConfig.filePath + "/" + prefix + "/u/" + path);
			if (!targetDir.exists()) {
				targetDir.mkdirs();
			}
			File target = new File(targetDir, fileName);
			if (!target.exists()) {
				target.createNewFile();
			}
			FileOutputStream fos = new FileOutputStream(target);
			byte[] bts = new byte[300];
			while (fis.read(bts, 0, 300) != -1) {
				fos.write(bts, 0, 300);
			}
			fos.close();
			fis.close();
			json.put("error", 0);
			json.put("url",MyConfig.filePath + "/" + prefix + "/u/" + path + "/" + fileName);
			System.out.println(MyConfig.filePath + "/" + prefix + "/u/" + path + "/" + fileName);
			source.delete();
		} catch (FileNotFoundException e) {
			json.put("error", 1);
			json.put("message", "上传出现错误，请稍后再上传");
		} catch (IOException e) {
			json.put("error", 1);
			json.put("message", "文件写入服务器出现错误，请稍后再上传");
		}
		renderJson(json.toJSONString());
	}

	public void uploadFiles() {
		List<UploadFile> uploadFile = getFiles(MyConfig.filePath + "/temp", 100 * Const.DEFAULT_MAX_POST_SIZE);
		for (UploadFile uploadfile : uploadFile) {
			// System.out.println(uploadfile.getParameterName());

			String path = new SimpleDateFormat("yyyy/MM/dd").format(new Date());
			// UploadFile file = getFile("imgFile", PathKit.getWebRootPath() +
			// "/temp");
			UploadFile file = getFile(uploadfile.getParameterName(), MyConfig.filePath + "/temp",
					100 * Const.DEFAULT_MAX_POST_SIZE);

			File source = file.getFile();
			String fileName = file.getFileName();
			String extension = fileName.substring(fileName.lastIndexOf("."));
			String prefix;
			if (".png".equals(extension) || ".jpg".equals(extension) || ".gif".equals(extension)) {
				prefix = "img";
				fileName = generateWord() + extension;
			} else {
				prefix = "file";
			}
			JSONObject json = new JSONObject();
			try {
				FileInputStream fis = new FileInputStream(source);
				File targetDir = new File(MyConfig.filePath + "/" + prefix + "/u/" + path);
				if (!targetDir.exists()) {
					targetDir.mkdirs();
				}
				File target = new File(targetDir, fileName);
				if (!target.exists()) {
					target.createNewFile();
				}
				FileOutputStream fos = new FileOutputStream(target);
				byte[] bts = new byte[300];
				while (fis.read(bts, 0, 300) != -1) {
					fos.write(bts, 0, 300);
				}
				fos.close();
				fis.close();
				json.put("error", 0);
				json.put("url", DateUtil.getCurrentDate() + "/" + prefix + "/u/" + path + "/" + fileName);
				//System.out.println(MyConfig.filePath + "/" + prefix + "/u/" +
				//path + "/" + fileName);
				source.delete();
			} catch (FileNotFoundException e) {
				json.put("error", 1);
				json.put("message", "上传出现错误，请稍后再上传");
			} catch (IOException e) {
				json.put("error", 1);
				json.put("message", "文件写入服务器出现错误，请稍后再上传");
			}
			renderJson(json.toJSONString());
		}
		// renderJson(true);
	}

	public void downloadFile() {
		String path = getPara("path");
		System.out.println(path);
		renderFile(path);
	}

	private String generateWord() {
		String[] beforeShuffle = new String[] { "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F",
				"G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z" };
		List<String> list = Arrays.asList(beforeShuffle);
		Collections.shuffle(list);
		StringBuilder sb = new StringBuilder();
		for (int i = 0; i < list.size(); i++) {
			sb.append(list.get(i));
		}
		String afterShuffle = sb.toString();
		String result = afterShuffle.substring(5, 9);
		return result;
	}

	public void uploads() throws IOException, InterruptedException {
		List<String> urlinfo = imageUpload();

		JSONObject json = new JSONObject();
		json.put("filename", urlinfo.get(1));
		json.put("url", urlinfo.get(0));
		
		ZbusMQServer zmqs=new ZbusMQServer();
		
		ZbusRPCMQServer zrpcmqs=new ZbusRPCMQServer();
		String[] args=null;
		//zrpcmqs.server(args,Consts.ZBUS_SERVERPORT, "MyRpc", "-b", "-c", "-mq", 32);

//		zmqs.server(json, "MyMQ", 0);
		zmqs.server(json, "MyMQ", 1);

		renderJson(json.toJSONString());
	}

}
