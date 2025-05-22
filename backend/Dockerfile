# ----------- Stage 1: Build the app -------------
FROM maven:3.9.6-eclipse-temurin-17 AS builder

WORKDIR /app

# Copy project files
COPY . .

# Build the application
RUN mvn clean package -DskipTests

# ----------- Stage 2: Run the app --------------
FROM eclipse-temurin:17-jdk

WORKDIR /app

# Copy JAR file from the build stage
COPY --from=builder /app/target/*.jar app.jar

EXPOSE 8080

# Run the app
ENTRYPOINT ["java", "-jar", "app.jar"]
