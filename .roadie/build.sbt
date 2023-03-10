val sprayV = "1.3.2"
val akkaV = "2.4.0"
val scalaV = "2.11.12"
val micrometerVersion = "1.2.0"
val datadogVersion = "0.86.0"

organization := "test.org"
name := "test-service"
version := "3.10.2"
scalaVersion := scalaV

resolvers ++= Seq(
  "Artifactory" at "https://artifactory.nexus.com"
)

scalacOptions ++=  Seq(
  "-unchecked",
  "-feature",
  "-deprecation",
  "-encoding", "UTF-8",
  "-target:jvm-1.8"
)

libraryDependencies ++= Seq(
  "com.datadoghq" % "dd-java-agent" % datadogVersion
)

libraryDependencies ++= Seq(
  "com.mchange"             %   "c3p0"                              % "0.9.5.5",
  "mysql"                   %   "mysql-connector-java"              % "8.0.23",
  "io.uacf.scala-core"     %%  "scala-core-common"                  %   "3.1.0"   exclude("log4j", "log4j") exclude("org.slf4j", "slf4j-log4j12"),
  "io.uacf.scala-core"     %%  "scala-core-http"                    %   "2.4.3",
  "io.uacf.scala-core"     %%  "scala-core-metrics"                 %   "1.0.0",
  "io.uacf.scala-core"  %%  "scala-core-db"               % "2.1.6",
  "org.slf4j"           %   "log4j-over-slf4j"            % "1.7.7",
  "ch.qos.logback"      %   "logback-classic"             % "1.1.2",
  "com.typesafe.akka"   %%  "akka-slf4j"                  % akkaV,
  "io.grpc"             %  "grpc-netty"                      % "1.29.0",
  "io.netty"            %  "netty-tcnative-boringssl-static" % "2.0.30.Final",
  "io.micrometer"       %  "micrometer-core"                 % micrometerVersion,
  "io.micrometer"       %  "micrometer-registry-prometheus"  % micrometerVersion,
  "io.spray"            %%  "spray-caching"               % sprayV,
  "io.spray"            %%  "spray-can"                   % sprayV,
  "io.spray"            %%  "spray-routing"               % sprayV,
  "io.spray"            %%  "spray-json"                  % "1.3.2",
  "io.uacf.gg"          %%  "client-scala"                % "2.2.4",
  "com.typesafe.akka"   %%  "akka-actor"                  % akkaV,
  "io.spray"            %%  "spray-testkit"               % sprayV    % "test",
  "com.typesafe.akka"   %%  "akka-testkit"                % akkaV     % "test",
  "org.specs2"          %%  "specs2-core"                 % "2.3.13"  % "test",
  "org.scalatest"       %%  "scalatest"                   % "3.0.1"   % "test",
  "org.mockito"         %   "mockito-all"                 % "1.9.5"   % "test",
  "com.typesafe.slick"  %%  "slick"                       % "2.1.0",
  "org.scala-lang"      %   "scala-reflect"               % scalaV,
  "net.minidev"         %   "json-smart"                  % "2.2.1",
  "com.beachape"        %%  "enumeratum"                  % "1.2.2",
  "com.h2database"      %  "h2"                           % "1.4.187" % "test",
  "org.apache.avro"     % "avro"                          % "1.8.2",
  "com.typesafe.scala-logging" %% "scala-logging"            % "3.9.4"
)

// fork jvm in run and test to prevent app from crashing sbt
run / fork := true
test / fork := true

enablePlugins(PackPlugin)
packJvmOpts := Map(
  "service-bootstrap" -> Seq(
    "-javaagent:$PROG_HOME/lib/dd-java-agent-" + s"$datadogVersion.jar"
  )
)
