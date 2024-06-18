#include <WiFi.h>
#include <HTTPClient.h>
#include <ArduinoJson.h>

const char* ssid = "privatWiFiNotlyPublic";
const char* password = "faingganteng9";

const char* accountId = "666f44870039e16cc72e";
const char* documentId_settings = "666f44dc002268a3e2d3";
const char* documentId_examination = "666f44af003964c3522b";

const char* projectId = "665473ce003130caea7d";
const char* appwriteApiKey = "e15e93c5af1387df226f945507459ca55cc4862fe5f28d770bee5287e89908dd86320b540ef4ef4ff0dfe1a5602539aee9c55daecb915039d174d50e3fb7ed41fb05599e76f8a29a4c47e1e6ef97aee2b3ebf654de19e398a398fb9601a04d5447971f53cf0310a88f69386afbf041fbb0d5f24151c65da338614285e72222ae";

String mode_setting = "off";
int speed_setting = 0;
int angle_setting = 0;
int time_setting = 0;

String newMode_setting = "off";
int newSpeed_setting = 0;
int newAngle_setting = 0;
int newTime_setting = 0;

int newBloodPressure = 102;
int newOxygenSaturation = 99;
int newHeartRate = 53;

void getSettings() {
  const char* appwriteEndpoint = "https://cloud.appwrite.io/v1/databases/6654775f00195369c8c3/collections/6660d1fc001a24f0effd/documents";

  if (WiFi.status() == WL_CONNECTED) {
    HTTPClient http;

    http.begin(appwriteEndpoint); 
    http.addHeader("Content-Type", "application/json");
    http.addHeader("X-Appwrite-Project", projectId);  
    http.addHeader("X-Appwrite-Key", appwriteApiKey);  

    int httpResponseCode = http.GET();

    if (httpResponseCode > 0) {
      String response = http.getString(); 
      // Serial.println(httpResponseCode);
      // Serial.println(response);

      DynamicJsonDocument doc(2048);
      DeserializationError error = deserializeJson(doc, response);

      if (!error) {
        if (doc.containsKey("total")) {
          for (int i = 0; i < doc["total"]; i++) {
            if (doc["documents"][i]["settingArteriTools"]["accountId"] == accountId) {
              JsonObject document = doc["documents"][i];
          
              mode_setting = document["mode"].as<String>();
              speed_setting = document["speed"];
              angle_setting = document["angle"];
              time_setting = document["time"];
            }
          }
        } else {
          Serial.println("Key 'total' not found in response");
        }
      } else {
        Serial.print("deserializeJson() failed: ");
        Serial.println(error.f_str());
      }
    } else {
      Serial.print("Error on HTTP request: ");
      Serial.println(httpResponseCode);
    }
    http.end();  
  }
}

void updateSettings(const char* documentId_settings, const char* newMode, int newSpeed, int newAngle, int newTime) {
  String appwriteEndpoint = "https://cloud.appwrite.io/v1/databases/6654775f00195369c8c3/collections/6660d1fc001a24f0effd/documents/" + String(documentId_settings);

  if (WiFi.status() == WL_CONNECTED) {
    HTTPClient http;

    http.begin(appwriteEndpoint); 
    http.addHeader("Content-Type", "application/json");
    http.addHeader("X-Appwrite-Project", projectId);  
    http.addHeader("X-Appwrite-Key", appwriteApiKey);  

    DynamicJsonDocument doc(1024);

    JsonObject data = doc.createNestedObject("data");
    data["mode"] = newMode;
    data["speed"] = newSpeed;
    data["angle"] = newAngle;
    data["time"] = newTime;

    JsonArray permissions = doc.createNestedArray("permissions");
    permissions.add("read(\"user:" + String(accountId) + "\")");
    permissions.add("update(\"user:" + String(accountId) + "\")");
    permissions.add("delete(\"user:" + String(accountId) + "\")");

    String requestBody;
    serializeJson(doc, requestBody);

    Serial.println("Request Body:");
    Serial.println(requestBody);

    int httpResponseCode = http.PATCH(requestBody);

    if (httpResponseCode > 0) {
      String response = http.getString();
      Serial.println("HTTP Response Code: " + String(httpResponseCode));
      Serial.println("Response: " + response);
    } else {
      Serial.print("Error on HTTP request: ");
      Serial.println(httpResponseCode);
    }
    http.end();
  }
}

void updateExamination(const char* documentId_examination, int newBloodPressure, int newOxygenSaturation, int newHeartRate) {
  String appwriteEndpoint = "https://cloud.appwrite.io/v1/databases/6654775f00195369c8c3/collections/6660d29a00049a28f7fd/documents/" + String(documentId_examination);

  if (WiFi.status() == WL_CONNECTED) {
    HTTPClient http;

    http.begin(appwriteEndpoint); 
    http.addHeader("Content-Type", "application/json");
    http.addHeader("X-Appwrite-Project", projectId);  
    http.addHeader("X-Appwrite-Key", appwriteApiKey);  

    DynamicJsonDocument doc(1024);

    JsonObject data = doc.createNestedObject("data");
    data["bloodPressure"] = newBloodPressure;
    data["oxygenSaturation"] = newOxygenSaturation;
    data["heartRate"] = newHeartRate;

    JsonArray permissions = doc.createNestedArray("permissions");
    permissions.add("read(\"user:" + String(accountId) + "\")");
    permissions.add("update(\"user:" + String(accountId) + "\")");
    permissions.add("delete(\"user:" + String(accountId) + "\")");

    String requestBody;
    serializeJson(doc, requestBody);

    Serial.println("Request Body:");
    Serial.println(requestBody);

    int httpResponseCode = http.PATCH(requestBody);

    if (httpResponseCode > 0) {
      String response = http.getString();
      Serial.println("HTTP Response Code: " + String(httpResponseCode));
      Serial.println("Response: " + response);
    } else {
      Serial.print("Error on HTTP request: ");
      Serial.println(httpResponseCode);
    }
    http.end();
  }
}

void arteriStart() {
  getSettings();

  if (mode_setting == "on") {
    Serial.println("Arteri sedang bekerja..");
    if (time_setting > 0) {
      delay(time_setting * 1000);
    } else {
      delay(100);
    }

    updateExamination(documentId_examination, newBloodPressure, newOxygenSaturation, newHeartRate);

    if (mode_setting != "off" && speed_setting != 0 && angle_setting != 0 && time_setting != 0) {
      delay(3000);
      updateSettings(documentId_settings, newMode_setting.c_str(), newSpeed_setting, newAngle_setting, newTime_setting);
      delay(5000);
    }

    if (mode_setting == "off") {
      Serial.println("Arteri telah selesai bekerja.");
    }
  } else {
    Serial.println("Arteri kondisi Off.");
  }
}

void setup() {
  Serial.begin(115200);
  delay(4000); 

  WiFi.begin(ssid, password);
  Serial.print("Connecting to Wi-Fi");
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println();
  Serial.println("Connected to Wi-Fi");
}

void loop() {
  arteriStart();

  delay(100);
}
